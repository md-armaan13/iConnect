const Post = require('../models/post'); // including post model


module.exports.Users_post=(req,res)=>{
 // creating posts
 if(!req.isAuthenticated()){
    return res.redirect('/user/sign-in');
 }
    Post.create({
        content: req.body.content,
        user: req.user._id,
    },function(err,user){
        if(err){
            console.log("error in creating post");
            return;
        }
        return res.redirect('back');
    })


}