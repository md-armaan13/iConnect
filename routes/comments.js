const express = require('express');
const router = express.Router();


const UsersComments= require('../controllers/comments'); // INCLUDING CONTROLLER

router.post('/',UsersComments.Users_comment);


module.exports= router;