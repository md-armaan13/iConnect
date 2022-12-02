

const development = {
 name :"development",
 asset_path : '/assets',
 session_cookie_key : 'connection',
 db :'iConnect_development',
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


}

const production ={


}


module.exports = development;