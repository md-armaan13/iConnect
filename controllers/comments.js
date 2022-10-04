const Post = require('../models/post');
const Comment =require('../models/comment');

module.exports.Users_comment=(req,res)=>{

    if(!req.isAuthenticated()){
        return res.redirect('/user/sign-in'); //CHECK IF USER IS SIGN IN
     }

     Comment.create({
        content: req.body.content,
        user:req.user._id,
        post : req.body.post,  // WE PASS THE ID IN HIDDEN INPUT
     },function(err,user){
        if(err){
            console.log("error in creating comment");
            return;
        }
        Post.findById(req.body.post,(err,user1)=>{ // FINDING THE POST TO ADD COMMENT IN THE COMMENT ARRAY
            if(err){
                console.log("error in finding post");
                return;
            }
            user1.comments.push(user._id); // PUSHING THE COMMENT 
            user1.save();
        });
        return res.redirect('back');

     });
}