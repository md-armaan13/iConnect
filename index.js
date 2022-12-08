const express= require('express');
const app= express();
const env = require('./config/environment');
require('./config/view-helper.js')(app);

// for writing logs to the files
const morgan = require('morgan');

const port=8000;
const db= require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts'); // INCLUDING THE LAYOUT LIBRARY
const path = require('path');
// INCLUDING COOKIE PARSER TO ACCESS THE COOKIES
 const cookieParser= require('cookie-parser');
// INCLUDING SASS MIDDLEWARE 
const sassMiddleware =require('node-sass-middleware');

// passport modules
const session = require('express-session');// used for session cookies
const passport= require('passport');
const passportLocal = require('./config/passpot-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-googlt-oAuth-strategy');
const MongoStore = require('connect-mongo');
// because storing session info in databse

// requiring CONNECT_FLASH

const flash = require('connect-flash');
const customMiddleware= require('./config/middleware');
//PUT BEFORE SERVER START

//for chatting engine for socket.io
const chatServer =require('http').Server(app);

const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(morgan(env.morgan.mode,env.morgan.options))

//requiring noty

if(env.name=='development'){
    app.use(sassMiddleware({

        src : path.join(__dirname,process.env.asset_path,'scss'),
        dest :path.join(__dirname,process.env.asset_path,'css'),
        debug: 'true',
        outputStyle : 'extended',
        prefix : '/css'
    }))


}



// TO READ POST REQUEST 
app.use(express.urlencoded());

// MIDDLEWARE TO USE COOKIE
app.use(cookieParser());


app.use(express.static(env.asset_path));//   TELLING APP TO USE STATIC FOLDER FOR CSS AND JS FILES

// make the uploads path  available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts); // TELLING APP TO USE LIBRARY "IT SHOULD BE BEFORE ROUTES"

// EXTRACT STYLES AND SCRIPT FROM SUBPAGES INTO THE LAYOUTS
app.set('layout extractStyles',true);       
app.set('layout extractScripts',true);





require('./workers/comment_email_worker');
require('./workers/reset_password_worker')


// SET UP VIEW ENGINE
app.set('view engine','ejs');
app.set('views','./views');

//just after the views 
//mongo store to store session cookie in db
app.use(session({

    name: 'iConnect', // name of cookie
    //TO-DO CHANGE THE SECRET KEY BEFORE DEPLOYMENT
    secret: env.session_cookie_key,
    saveUninitialized :false, // if user not logged in so we don't store in session cookie
     resave: false, // prevent any repeated saving of data if it is not changed
     cookie:{
        maxAge :(1000*60*100), //  TO SET TIMESPAN OF COOKIE IN BROWSER(IN MILLISECONDS)
     },
     store:MongoStore.create({
    
            mongoUrl:'mongodb://localhost:27017/',
            autoRemove: 'disabled'
        
     },function(err){
        console.log(err,"error on setting connection");
     })

}));
 // middleware for passport
app.use(passport.initialize());
app.use(passport.session());
 // IMPORTANT OUR SESSION DATA IS TEMPORARY STORED 
app.use(passport.setAuthenticatedUser);

//FLASH MESSAGES
app.use(flash());
app.use(customMiddleware.setFlash);

// using express router 
// IT SHOULD BE USED BELOW PASSPORT MIDDLEWARE
app.use('/',require('./routes/index')); 


app.listen(port,function(err) {

    if(err) { 
        //console.log ('Error in running the server ' , err ) ;
            console.log(`Error in running the server : ${err}`); // backtick "Interpolation"
    }
   // console.log ( ' Yup ! My Express Server is running on Port : ' , port ) ;
        console.log(`My Express Server is running on Port : ${port}`);
} ) ;

// moving to diiferent branch for manual authentication