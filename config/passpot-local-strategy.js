const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


// authentication
passport.use(new LocalStrategy({

    usernameField: 'email',  // DETECTING USER WHICH IS UNIQUE ACCODING TO SCHEMA
},

    function (email, password, done) { // when local startegy  is called email pass and is passed on in hte callback
        // done is inbuilt in passport it is callback function
        // find user and establish its identity
        User.findOne({ email: email }, function (err, user) { // here one email is property which we are looking for
            // other is user's email
            if (err) {
                console.log('error in finding user --> Passport');
                return done(err); // report an error to passport

            }

            if (!user || user.password != password) {
                console.log("Invalid Username/Password");
                return done(null, false);// since there is no error bur authentication is not done
            }

            return done(null, user);

        });
    }

));

/*Serialize user fuction 
to tell which key store in cookies in encrypted mannner
*/
passport.serializeUser(function (user, done) {

    done(null, user.id);// we are storing user id in encrypted format

})

// deserializing the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {  //finding user with the id in the cookie
        if (err) {
            console.log('error in finding user --> Passport');
            return done(err); // report an error to passport

        }
        return done(null, user);
    })

})

// check if the user id authenticated in every request from a server we use it as a middleware

passport.checkAuthentication = function (req, res, next) {
    // if user is signed in, then pass on the request  to the next  function(controllers action)
    if (req.isAuthenticated()) {
        return next();
    }
    // IF THE USER IS NOT SIGNED IN
    return res.redirect('/user/sign-in');


}


// middleware to store dtat of user in the locals which is temporary data
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //  REQ.USER CONTAIN THE CURRENT SIGNED IN USER FROM THE SESSION COOKIE AND WE ARE SENDING THIS TO A LOCALS FOR THE VIEWS
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;