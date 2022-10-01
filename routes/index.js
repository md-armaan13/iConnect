 const express = require('express');
 const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log("Router initialised");

router.get('/',homeController.home);// calling home controller when '/' is called
router.use('/user',require('./users_route'))


 module.exports=router;