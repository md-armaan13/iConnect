const Post= require('../models/post')
const User = require('../models/user');
const Friendship = require('../models/friend');
module.exports.home=  async (req,res)=>{ // exporting the fuction so that router can use
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


    try{

          // populating the user with the post
  const posts= await Post.find({})
  .sort({'updatedAt': -1})
  .populate('user')
  //population chaining 
  .populate({
        path:'comments', //  PATH NAME IS AS PROVIDED IN POST SCHEMA
        populate :[
            {path: 'user' },
        // changes for likes
        // populating likes for comment
        {path:'likes'}]
  })
  // populating likes for post 
  .populate('likes'); 

  const user= await User.find({});
  let friend;
  if(req.user){
    friend = await User.findById(req.user._id).populate({
        path : 'friendships',
        populate :[
            {path : 'from_user'},
            {path : 'to_user'}
        ]
    });
    
  }
 // console.log(posts[0]);
      return res.render('home',{
          title : "iConnect | Home",
          post :posts,
          all_users:user,
          friend : friend,
      });

    }catch(err){

        console.log(err,"error in home page");
        return;
    }


  
    
};
