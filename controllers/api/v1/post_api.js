const Post= require('../../../models/post'); 
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