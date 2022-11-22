const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opt ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'iConnect',// decryption key
};

passport.use( new JwtStrategy(opt,function(jwtPayload,done){

User.findById(jwtPayload._id, function(err,user){

    if(err){console.log("Error in finding user in jwt",err); return ;}

    if(user){
        return done(null,user);
    }else{
        return done (null,false);
    }

})

}))

module.exports= passport;