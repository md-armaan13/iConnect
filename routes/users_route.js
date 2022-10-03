const express = require('express');
const passport= require('passport');
const router = express.Router();

const userController = require('../controllers/users');


router.get('/',userController.user_profile);

router.get('/profile',userController.profile);

router.get('/post',userController.post);

router.get('/sign-in',userController.Sign_In); // route for sign in

router.get('/sign-up',userController.Sign_Up); // route for sign up

router.post('/create',userController.Create_user);


// use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),userController.Create_session);

module.exports=router;