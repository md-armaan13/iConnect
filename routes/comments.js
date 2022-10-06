const express = require('express');
const router = express.Router();
const passport= require('passport');

const UsersComments= require('../controllers/comments'); // INCLUDING CONTROLLER

router.post('/',UsersComments.Users_comment);

router.get('/delete-comment/:id',passport.checkAuthentication,UsersComments.deleteComment);
module.exports= router;