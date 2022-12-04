require('dotenv').config()
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');// path where logs are stored

//check if logs file exist or not if not then create
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// file name is access.log rfs is used to clear log history
const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});



const development = {
 name :"development",
 asset_path : './assets',
 session_cookie_key : 'connection',
 db :'iConnect_development   ',
 smtp : {
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {

        user : 'md.2125cse1047@kiet.edu',
        pass : '1372001@'
    }

},
google_client_id : "296060815300-llt7plclurtnd9km30ikhgspmfj4r8o0.apps.googleusercontent.com",
google_client_secret : "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",
google_callback_url : "http://localhost:8000/user/auth/google/callback",

jwt_secret_key : 'iConnect',
morgan : {
    mode :'dev',
    options : {
        stream : accessLogStream
    }
}

}

const production ={
    name :"production",
    asset_path :process.env.ASSET_PATH,
    session_cookie_key : process.env.SESSION_COOKIE_KEY,
    db : process.env.DB,
    smtp : {
       service : 'gmail',
       host : 'smtp.gmail.com',
       port : 587,
       secure : false,
       auth : {
   
           user : process.env.iConnect_GMAIL_EMAIL,
           pass : process.env.iConnect_GMAIL_PASS
       }
   
   },
   google_client_id : process.env.GOOGLE_CLIENT_ID,
   google_client_secret : process.env.GOOGLE_CLIENT_SECRET,
   google_callback_url : process.envGOOGLE_CALLBACK_URL,
   
   jwt_secret_key : process.env.JWT_SECRET_KEY,
   morgan : {
    mode :'combined',
    options : {
        stream : accessLogStream
    }
}

}


//module.exports = development
module.exports = production
//module.exports = eval(process.env.ENV)== undefined ? development : eval(process.env.ENV);