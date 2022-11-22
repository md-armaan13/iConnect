const express = require('express');
 const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users.js');

router.post('/Create-session',usersApi.Create_session);

 
 module.exports=router;