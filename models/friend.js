const mongoose =require('mongoose');

const friendshipSchema= new mongoose.Schema({
    //the user whho send the request 
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   to_user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   }

},
{
    timestamps : true,
});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports= Friendship;
