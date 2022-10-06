const express = require('express');
const passport= require('passport');
const router = express.Router();

const Userspost= require('../controllers/users_posts'); // INCLUDING CONTROLLER

router.post('/',Userspost.Users_post);

router.get('/delete/:id',passport.checkAuthentication,Userspost.delete);

module.exports= router;