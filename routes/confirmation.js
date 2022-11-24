const express = require('express');
const router = express.Router();

const userPassword = require('../controllers/password');

router.get('/',userPassword.reset)

router.post('/createToken',userPassword.createToken);


module.exports=router;