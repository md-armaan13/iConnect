const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require ('../../../config/environment')

module.exports.Create_session= async (req,res)=>{
    
    try
    {
        let user = await User.findOne({email: req.body.email});

        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message : "Invalid username/password"
            })
        }

        return res.json(200,{
            message : "signIn sucessful",
            data : {
                token: jwt.sign(user.toJSON(),env.jwt_secret_key,{expiresIn : '1000000'})
            }
        })

    }catch(err){
        return res.json(500,{
            message : "internal server errors"
        })

    }
    
}