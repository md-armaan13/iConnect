const Post = require('../models/post');
const Comment =require('../models/comment');
const commentsMailer = require('../mailers/comments_mailers');
const queue = require('../config/kue');

const commentEmailWorker = require('../workers/comment_email_worker');
module.exports.Users_comment= async (req,res)=>{

    if(!req.isAuthenticated()){
        return res.redirect('/user/sign-in'); //CHECK IF USER IS SIGN IN
     }
     try{
        let comment= await Comment.create({
            content: req.body.content,
            user:req.user._id,
            post : req.body.post,  // WE PASS THE ID IN HIDDEN INPUT
         });
    
        let user1= await Post.findById(req.body.post ); // FINDING THE POST TO ADD COMMENT IN THE COMMENT ARRAY
    
            user1.comments.push(comment._id); // PUSHING THE COMMENT 
            user1.save();
            comment = await comment.populate('user','name email');
           // commentsMailer.newComment(comment)

           // adding to queue
           let job = queue.create('emails',comment).save(function(err){
            if(err){console.log('error in pushing comment mail to queue',err);return }
              console.log(job.id);
           });
            return res.redirect('back');
     }catch(err){
        console.log(err,"error in creating comment");                   
        return;

     }
   
}


module.exports.deleteComment= async (req,res)=>{

    if(!req.isAuthenticated()){
        return res.redirect('/user/sign-in'); //CHECK IF USER IS SIGN IN
     }
try{
    let comment = await Comment.findById(req.params.id);

    if(comment.user==req.user.id){

        let postid=comment.post;
        comment.remove();

     let post= await  Post.findByIdAndUpdate(postid,{$pull :{comments:req.params.id}});
                return res.redirect('back')
    }else{

        return res.redirect('back');
    }

}catch(err){

 console.log(err,"error in creating comment");
        return;

}
  


}