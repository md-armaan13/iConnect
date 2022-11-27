const express = require('express');
 const router = express.Router();
 const passport= require('passport');
 const FriendshipController = require('../controllers/friends');


  router.get('/:id',passport.checkAuthentication,FriendshipController.Create_friendship);


 module.exports=router;