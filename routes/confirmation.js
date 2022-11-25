const express = require('express');
const router = express.Router();

const userPassword = require('../controllers/password');

router.get('/',userPassword.reset)

router.post('/createToken',userPassword.createToken);
router.get('/reset_password/:reset_token',userPassword.resetPassword);
router.post('/password_reset/:id/:reset_tokenid',userPassword.passwordReset);

module.exports=router;