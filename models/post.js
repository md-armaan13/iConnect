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
    // INCLUDING THE ARRAY OF ID'S OF ALL COMMENTS RELATED TO THE POST
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment' // wirte refernce to module export name
        }
             ],
    likes :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},
{
    timestamps: true,
});

const Post = mongoose.model('Post',postSchema);

module.exports= Post;