const passport = require('passport');
 const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
//tell passport to use google strategy
passport.use(new googleStrategy({
    clientID : env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL : env.google_callback_url,
},
    function(accessToken,refreshToken,profile,done){
        //find user in db
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("error in google strategy passport ",err);}
            if(user){
                //if user found set this user as req.user
                return done(null,user);
            }else{
                //if user not found then create
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                    username : profile.displayName,
                },(err,user)=>{
                    if(err){console.log("error in creating user ",err);}
                    return done(null,user);
                })
            }
        })
    }
));

module.exports= passport

