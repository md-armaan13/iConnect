 const express = require('express');

const homeController = require('../controllers/home_controller');
 const router = express.Router();

console.log("Router initialised");

router.get('/',homeController.home);// calling home controller when '/' is called
router.use('/user',require('./users_route'))


 module.exports=router;