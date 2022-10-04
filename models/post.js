const mongoose= require('mongoose');


const postSchema= new  mongoose.Schema({

    content:{
        type: String,
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, // linking content to user's id
        ref : 'User'  // schema name of user 
    },
},
{
    timestamps: true,
});

const Post = mongoose.model('Post',postSchema);

module.exports= Post;