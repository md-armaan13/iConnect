const mongoose = require('mongoose');
const multer = require('multer');
const path =require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema= new  mongoose.Schema({

        email:{
            type:String,
            required : true,
            unique: true
        },

        password:{
            type: String,
            required: true
        },
        name:{
            type : String,
            required: true
        },
        avatar:{
            type : String,

        },
        username:{
            type : String,
            reqiured : true

        },
        friendships:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
            }
        ]
},{
    timestamps: true
});

var storage = multer.diskStorage( {
    destination: function (req, file, cb) { // cb is a call back function
    cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    
    cb(null, file.fieldname + '-' + Date.now());// every file file will save as avatar-date.now 
    
     
    }

});

//static function which can be use globally when user modal is required
userSchema.statics.uploadedAvatar= multer({storage : storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg'&& ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }, 
}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH; // accessible averywhere when we require user modals

const User = mongoose.model('User',userSchema);

module.exports= User;