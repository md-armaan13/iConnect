const User = require('../models/user');// ACQUIRING THE MODEL SO THAT TO CREATE USER

module.exports.user_profile= (req,res)=>{ // exporting the fuction so that router can use

    return res.render('user_profile',{
        title: 'iConnect |User Profile'
    });

};


module.exports.profile= (req,res)=>{ 

    return res.send('<h1>Armaan"s Profile</h1>');

}

module.exports.post= (req,res)=>{ 

    return res.send('<h1>Armaan"s post</h1>');

}


//render sign in page to layout
module.exports.Sign_In= (req,res)=>{
        if(req.isAuthenticated()){
          return  res.redirect('/user/profile')
        }
    return res.render('user_sign_in',{
        title: "iConnect | Sign In"
    });
};


// render sign up page to layout
module.exports.Sign_Up= (req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/user/user_profile')
    }
    return res.render('user_sign_up',{
        title: "iConnect | Sign Up"
    });

};
 // creating user when user signup
module.exports.Create_user= (req,res)=>{
    
    // CHECKING PASSWORD OR CONFIRM PASSWORD IS EQUAL OR NOT
    if(req.body.password!= req.body.confirm_password){
        console.log('password did not match');
        return res.redirect('back');
    }
         
    //Now WE FIND USER WITH SAME ID IF IT EXIST OR NOT
        User.findOne({email: req.body.email},(err,user)=>{
            if(err){console.log('error in finding the user in db'); return;}

        if(!user){ // if user does not exist
            User.create(req.body,(err,user)=>{  // creating user
                if(err){console.log('error in creating the user in db'); return;}
                return res.redirect('/user/sign-in');
            })
               
        }else{
            console.log('user already exist');
            return res.redirect('back');
        }

        })

}
//creating session when user sign in
module.exports.Create_session= (req,res)=>{
    return res.redirect('/');
}

module.exports.Destroy_session=(req,res)=>{
    req.logout(function(err){
        if(err){
            return;
        }
    });

    return res.redirect('/');

}