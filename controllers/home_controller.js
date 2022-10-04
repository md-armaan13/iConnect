const Post= require('../models/post')

module.exports.home= (req,res)=>{ // exporting the fuction so that router can use
   /* Post.find({},(err,posts)=>{
        if(err){
            console.log('error in fetching post from db');
            return;
        }
        
        return res.render('home',{
            title : "Home",
            post :posts,
        });
    });*/
    // populating the user with the post
    Post.find({}).populate('user').exec(function(err,posts){
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
