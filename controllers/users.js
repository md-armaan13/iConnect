const User = require('../models/user');// ACQUIRING THE MODEL SO THAT TO CREATE USER

module.exports.user_profile= (req,res)=>{ // exporting the fuction so that router can use

    return res.send('<h1>Users Profile</h1>');

}


module.exports.profile= (req,res)=>{ 
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(err){console.log('error in finding the user in db'); return;}
           
            if(user){
    
               return res.render('user_profile',{
                title: "iConnect | Profile",
                userdata: user,
               });
    
            }else{
                return res.redirect('/user/sign-in');
            }
        })
    }else{
        return res.redirect('/user/sign-in');
    }
    
   

    

}

module.exports.post= (req,res)=>{ 

    return res.send('<h1>Armaan"s post</h1>');

}


//render sign in page to layout
module.exports.Sign_In= (req,res)=>{

    return res.render('user_sign_in',{
        title: "iConnect | Sign In"
    });
};


// render sign up page to layout
module.exports.Sign_Up= (req,res)=>{

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

    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding the user in db in sign in'); return;}

         // handle user found
         if(user){

             //hanle mismatching of password
                if(user.password!=req.body.password){
                    return res.redirect('back');
                }

                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/user/profile');
             
         }else{
            //handle user not found
            return res.redirect('back');
         }

    });

}

module.exports.Sign_out =(req,res)=>{

    if(req.cookies.user_id){
        res.clearCookie('user_id')
       return res.redirect('/user/sign-in');
    }else{
        return res.redirect('/user/sign-in');
    }


}