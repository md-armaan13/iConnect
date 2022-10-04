const Post= require('../models/post')

module.exports.home= (req,res)=>{ // exporting the fuction so that router can use
    Post.find({user :req.user._id},(err,posts)=>{
        if(err){
            console.log('error in fetching post from db');
            return;
        }
        
        return res.render('home',{
            title : "Home",
            post :posts,
        });
    });
    
    
};
