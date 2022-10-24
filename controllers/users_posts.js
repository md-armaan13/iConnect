const Post = require('../models/post'); // including post model
const Comment =require('../models/comment');

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
              return res.redirect('back');
         
        }else{
            return res.redirect('back');
        }

   


}