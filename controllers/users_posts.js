const Post = require('../models/post'); // including post model
const Comment =require('../models/comment');

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

module.exports.delete=(req,res)=>{
    // find the post if it exist or not
    Post.findById(req.params.id,(err,post)=>{
        if(err){
            console.log(err,'error in finding the post');
            return;
        }
        // .id means coverting the object id into string
        if(post.user==req.user.id){
            post.remove();
       
            Comment.deleteMany({post: req.params.id},(err)=>{
                        return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }

    })


}