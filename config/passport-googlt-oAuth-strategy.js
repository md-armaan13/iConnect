const passport = require('passport');
 const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use google strategy
passport.use(new googleStrategy({
    clientID : "296060815300-llt7plclurtnd9km30ikhgspmfj4r8o0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:8000/user/auth/google/callback"
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

