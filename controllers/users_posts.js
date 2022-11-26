const Post = require('../models/post'); // including post model
const Comment =require('../models/comment');
const Like = require('../models/likes');
module.exports.Users_post= async (req,res)=>{
 // creating posts
 if(!req.isAuthenticated()){
    return res.status(200).json({
        data:{
            "redirect": true,
            "redirect_url" :"/user/sign-in"
        },
        message: "sign in first"
    });
 }
   let post = await Post.create({
        content: req.body.content,
        user: req.user._id,
    });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post : post,
                },
                message: "post created",
            })
        }
    return res.redirect('back');
}

module.exports.delete= async (req,res)=>{
    // find the post if it exist or not
   let post = await Post.findById(req.params.id);
        
        // .id means coverting the object id into string
        if(post.user==req.user.id){
           await post.remove();
       
       let comment= await Comment.deleteMany({post: req.params.id});
             
        // changes done for likes 
        //deleting likes of post when post is deleted
         
       await Like.deleteMany({likeable : post._id,onModel :"Post"});
        // deleting likes of every comment in the post


        // here it will go through all the comment of the post 
        // now we use like delete many and comment has field likes it will delete all the likes associated with it
        await Like.deleteMany({_id:{$in : post.comments}});


        return res.redirect('back');

        }else{
            return res.redirect('back');
        }

   


}