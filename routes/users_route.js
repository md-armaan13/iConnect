const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');


router.get('/',userController.user_profile);

router.get('/profile',userController.profile);

router.get('/post',userController.post);

router.get('/sign-in',userController.Sign_In); // route for sign in

router.get('/sign-up',userController.Sign_Up); // route for sign up

router.post('/create',userController.Create_user);

module.exports=router;