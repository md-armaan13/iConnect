const mongoose = require('mongoose');


const resetPasswordTokenSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    reset_Token :{
        type : String,
    },
    isValid:{
        type :Boolean,
    }
},
{
    timestamps : true,

}
    


);
resetPasswordTokenSchema.index({createdAt: 1},{expireAfterSeconds: 3600});
const resetPasswordToken=  mongoose.model('resetPasswordToken',resetPasswordTokenSchema);

module.exports=resetPasswordToken;