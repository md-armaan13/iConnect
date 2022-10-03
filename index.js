const express= require('express');
const app= express();
const port=8000;
const db= require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts'); // INCLUDING THE LAYOUT LIBRARY

// INCLUDING COOKIE PARSER TO ACCESS THE COOKIES
 const cookieParser= require('cookie-parser');


// passport modules
const session = require('express-session');// used for session cookies
const passport= require('passport');
const passportLocal = require('./config/passpot-local-strategy');


// TO READ POST REQUEST 
app.use(express.urlencoded());

// MIDDLEWARE TO USE COOKIE
app.use(cookieParser());


app.use(express.static('./assets'));//   TELLING APP TO USE STATIC FOLDER FOR CSS AND JS FILES

app.use(expressLayouts); // TELLING APP TO USE LIBRARY "IT SHOULD BE BEFORE ROUTES"

// EXTRACT STYLES AND SCRIPT FROM SUBPAGES INTO THE LAYOUTS
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);









// SET UP VIEW ENGINE
app.set('view engine','ejs');
app.set('views','./views');

//just after the views 
app.use(session({

    name: 'iConnect',
    //TO-DO CHANGE THE SECRET KEY BEFORE DEPLOYMENT
    secret:'connection',
    saveUninitialized :false,
     resave: false,
     cookie:{
        maxAge :(1000*60*100), //  TO SET TIMESPAN OF COOKIE IN BROWSER(IN MILLISECONDS)
     }

}));
 // middleware for passport
app.use(passport.initialize());
app.use(passport.session());

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