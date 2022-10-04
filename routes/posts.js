const express = require('express');
const passport= require('passport');
const router = express.Router();

const Userspost= require('../controllers/users_posts'); // INCLUDING CONTROLLER

router.post('/',Userspost.Users_post);

module.exports= router;