const mongoose =require('mongoose');

const likeSchema= new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //this  defines the object id to which schema you want to put the like
   likeable :{
    type: mongoose.Schema.Types.ObjectId,
    require : true,
    refPath : 'onModel'
   },

   // this define which model you choose to like as this is a dynamic reference
   onModel :{
    type :String,
    require : true,
    enum :  ['Post','Comment'] //the schema can be Post or Comment
   }

},
{
    timestamps : true,
});

const Like = mongoose.model('Like',likeSchema);

module.exports= Like;