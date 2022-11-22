const passport = require('passport');
 const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cypto = require('crypto');
const User = require('../models/user');

//tell passport to use google strategy
passport.use(new googleStrategy({
    clientID : "296060815300-llt7plclurtnd9km30ikhgspmfj4r8o0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},
    function(accessToken,refreshToken,profile,done){
        //find user in db
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("error in google strategy passport ",err);}
            if(user){
                //if user found set this user as req.user
                return done(null,user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },(err,user)=>{
                    if(err){console.log("error in creating user ",err);}
                    return done(null,user);
                })
            }
        })
    }
));

module.exports= passport

