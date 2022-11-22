const Post= require('../../../models/post'); 
const Comment = require('../../../models/comment');
module.exports.index = async (req,res)=>{

    const posts= await Post.find({})
    .sort({'updatedAt': -1})
    .populate('user')
    //population chaining 
    .populate({
        path:'comments', //  PATH NAME IS AS PROVIDED IN POST SCHEMA
        populate :{
            path: 'user'
                }
    });

return res.json(200,{
    message : "list of posts",
    posts : posts
});

}

module.exports.destroy= async (req,res)=>{

    try{
        let post = await Post.findById(req.params.id);

        if(post.user==req.user.id){

            post.remove();
            await Comment.deleteMany({post : req.params.id});

            return res.json(200,{
                message : "post and related comments was deleted"
            });


        }else{
            return res.json(401,{
                message : "you cannot deledte the post"
            })
        }
    }catch(err){
            console.log(err);
            return res.json(500,{
                message : " internal server error "
            })
    }
}