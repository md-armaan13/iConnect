const Post = require('../models/post'); // including post model
const Comment =require('../models/comment');
const Like = require('../models/likes');



module.exports.toggleLike=async (req,res)=>{

    try{
        //url likes/toggle/?id=sxmx&type=Post
        let likeable;
        let deleted= false;

        if(req.query.type=='Post'){
            // finding the modal on which like has to  be done
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');

        }

        //check if like alreaady exist 
        let existingLikes = await Like.findOne({    // it will give you like done by user on particular field
            likeable :req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })
        // if like already exist then deleted
        if(existingLikes){

            likeable.likes.pull(existingLikes._id);// this is how you remove things from array
            likeable.save();
            existingLikes.remove(); // removing the existing like
            deleted =true;
        }else{//else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable : req.query.id,
                onModel : req.query.type,
            });

            likeable.likes.push(newlike._id);
            likeable.save();

            return res.json(200,{
                message : "request is Successful",
                data : deleted
            })

        }


    }catch(err){
        console.log(err);
        return res.json(500,{
            message : "Internal server error"
        })
    }


}