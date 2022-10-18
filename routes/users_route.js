const express = require('express');
const passport= require('passport');
const router = express.Router();

const userController = require('../controllers/users');




router.get('/profile/:id',userController.user_profile); // making profile page acesible when user is sign in


router.get('/sign-in',userController.Sign_In); // route for sign in

router.get('/sign-up',userController.Sign_Up); // route for sign up

router.post('/create',userController.Create_user);

router.get('/sign-out',userController.Destroy_session);

router.get('/edit-user',userController.Edit_profile);

router.post('/update/:id',userController.Update);


// use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),userController.Create_session);

module.exports=router;