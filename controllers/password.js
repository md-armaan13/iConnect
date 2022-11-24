const User = require('../models/user');// ACQUIRING THE MODEL SO THAT TO CREATE USER
const resetToken = require('../models/reset_token');
const crypto = require('crypto');
const queue = require('../config/kue');
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
        let job = await queue.create('reset',token).save(function(err){
            if(err){console.log('error in pushing token mail to queue',err);return }
              console.log(job.id);
           })

           return res.redirect('back');



    }catch(err){
        console.log(err,"error in creating comment");                   
        return;

    }




}