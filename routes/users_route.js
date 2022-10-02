const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');


router.get('/',userController.user_profile);

router.get('/profile',userController.profile);

router.get('/post',userController.post);

router.get('/sign-in',userController.Sign_In); // route for sign in

router.get('/sign-up',userController.Sign_Up); // route for sign up

router.post('/create',userController.Create_user); // route to fetch form data of sign up
router.post('/create-session',userController.Create_session);
router.get('/sign-out',userController.Sign_out);

module.exports=router;