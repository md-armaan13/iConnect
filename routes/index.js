 const express = require('express');
 const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log("Router initialised");

router.get('/',homeController.home);// calling home controller when '/' is called
// TELLING ROUTE TO USER ROUTE
router.use('/user',require('./users_route'))
//TELLING TO USE POST ROUTE
router.use('/user-post',require('./posts'));

router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/add-friend',require('./friends'));
router.use('/api',require('./api/index'));
 module.exports=router;