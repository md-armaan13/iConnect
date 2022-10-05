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
    Post.find({})
    .populate('user')
    //population chaining 
    .populate({
        path:'comments', //  PATH NAME IS AS PROVIDED IN POST SCHEMA
        populate :{
            path: 'user'
                }
    })
    .exec(function(err,posts){
        if(err){
            console.log(err,'error in fetching post from db');
            return;
        }
        
        return res.render('home',{
            title : "Home",
            post :posts,
            
        });

    });
    
};
