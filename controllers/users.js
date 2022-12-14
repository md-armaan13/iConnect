const multer = require('multer');
const User = require('../models/user');// ACQUIRING THE MODEL SO THAT TO CREATE USER
const fs=require('fs');
const path=require('path');
const Friendship=require('../models/friend');


module.exports.user_profile= async (req,res)=>{ // exporting the fuction so that router can use
    if(!req.isAuthenticated()){
        return res.redirect('/user/sign-in')
     }
     console.log(req.params.id);

     try{
        let friend_exist =false;
        let user = await User.findById(req.params.id);
        const friend1 = await Friendship.findOne({from_user:req.user._id,to_user :req.params.id});
        const friend2 = await Friendship.findOne({from_user:req.params.id,to_user :req.user._id});
        if(friend1||friend2){
            friend_exist= true;
        }
        console.log(req.params.id);

       return res.render('user_profile',{
           title: 'iConnect |User Profile',
          profile_user: user,
          exist: friend_exist
       });
     }catch(err){
        console.log(err,"error in user profile"); 
     }
  

};

module.exports.post= (req,res)=>{ 

    return res.send('<h1>Armaan"s post</h1>');

}


//render sign in page to layout
module.exports.Sign_In= (req,res)=>{
        if(req.isAuthenticated()){
          return  res.redirect('/')
        }

    return res.render('user_sign_in',{
        title: "iConnect | Sign In"
    });
};


// render sign up page to layout
module.exports.Sign_Up= (req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/')
    }
    return res.render('user_sign_up',{
        title: "iConnect | Sign Up"
    });

};
 // creating user when user signup
module.exports.Create_user= async (req,res)=>{
    
    // CHECKING PASSWORD OR CONFIRM PASSWORD IS EQUAL OR NOT
    if(req.body.password!= req.body.confirm_password){
        console.log('password did not match');
        return res.redirect('back');
    }
       try{
    //Now WE FIND USER WITH SAME ID IF IT EXIST OR NOT
    let user = await User.findOne({email: req.body.email});
           
    if(!user){ // if user does not exist
       let user= await User.create(req.body); // creating user
            
            return res.redirect('/user/sign-in');
    }else{
        console.log('user already exist');
        return res.redirect('back');
    }
       }catch(err){
        console.log(err,"error in creating user");
        return;
       }

       

}
//creating session when user sign in
module.exports.Create_session= (req,res)=>{
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.Destroy_session=(req,res)=>{
    req.logout(function(err){
        if(err){
            return;
        }
    });
    req.flash('success','Logged out successfully');
    return res.redirect('/');

};


module.exports.Edit_profile = (req,res)=>{
if(!req.isAuthenticated){

    res.redirect('/');

}
    res.render('edit_profile',{
        title: "iConnect | Edit Profile"
    });
 
}

module.exports.Update= async(req,res)=>{
if(!req.isAuthenticated){
    res.redirect('/');
}
try{
    if(req.user.id==req.params.id){

        const user= await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){

            if(err){console.log(err,"multer error")}
            user.name=req.body.name;
            user.email=req.body.email;
            user.username=req.body.username;
            if(req.file){
                if(user.avatar&& fs.existsSync(path.join(__dirname,'..', user.avatar))){
                    fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                }
                //this is saving the path of uploaded file
                user.avatar= User.avatarPath + '/' + req.file.filename;
            }
            console.log(req.file);
            user.save();
        });
        
        return res.redirect('/');
        
        
        
        }else{
            return res.status(401).send('Unauthorised');
        
        }
}catch(err){

    console.log(err,'error in updating the user');
    return;

}


}