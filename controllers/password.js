const User = require('../models/user');// ACQUIRING THE MODEL SO THAT TO CREATE USER
const resetToken = require('../models/reset_token');
const crypto = require('crypto');
const queue = require('../config/kue');
const queuereset = queue.resetqueue;
const resetmailer= require('../workers/reset_password_worker')


module.exports.reset= async (req,res)=>{

    return res.render('confirm_email',{
       
    });



}

module.exports.createToken= async (req,res)=>{

    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
            console.log("user does not exist");
            return res.redirect('/')
        }

        let token = resetToken.create({
            user: user._id,
            reset_Token : crypto.randomBytes(20).toString('hex'),
            isValid : true
        })

        token= await (await token).populate('user');
        await queuereset.add({token}).then(()=>{
            console.log("user token send")
        });

           return res.redirect('back');



    }catch(err){
        console.log(err,"error in creating token");                   
        return;

    }




}

module.exports.resetPassword= async (req,res)=>{
    try{
        let token = await resetToken.findOne({reset_Token:req.params.reset_token});
        console.log("here is Token",token);
        if(!token.isValid){
            return res.redirect('/')
        }
    
        return res.render('confirm_password',{
            token : token
        });

    }catch(err){
        console.log(err,"error in reset password page");                   
        return;


    }
    
    

}

module.exports.passwordReset= async(req,res)=>{
        if(req.body.newPassword!=req.body.confirmPassword){
            return res.redirect('back')
        }
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            console.log("USER DOES NOT EXIST");
            return res.redirect('/');
        }

        user.password=req.body.newPassword;
        user.save();
        let token = await resetToken.findById(req.params.reset_tokenid);
        if(!token){
            console.log("Unable to find token");
            return res.redirect('/');
        }
        token.isValid= false;
        token.save();
        return res.redirect('/user/sign-in');
        
    }catch(err){
        
        console.log(err,"error in changing the password");                   
        return;
    }



}