const User = require('../models/user');
const Friendship=require('../models/friend');



module.exports.Create_friendship = async (req,res)=>{

//const user = await User.findById(req.user._id).populate('friendships');
//console.log(user);
    try{
        const friend1 = await Friendship.findOne({from_user:req.user._id,to_user :req.params.id});
        const friend2 = await Friendship.findOne({from_user:req.params.id,to_user :req.user._id});    
        
        console.log(friend1);
        console.log(friend2);

            if(friend1||friend2){
        
                if(friend1){
                    const user1= await User.findByIdAndUpdate(req.user._id,{$pull :{friendships:friend1._id}});
                    const user2 = await User.findByIdAndUpdate(req.params.id,{$pull :{friendships:friend1._id}});
                    user1.save();
                    user2.save();
                    friend1.remove();
                    return res.redirect('back');
        
                }else{
                    const user3= await User.findByIdAndUpdate(req.user._id,{$pull :{friendships:friend2._id}});
                    const user4 = await User.findByIdAndUpdate(req.params.id,{$pull :{friendships:friend2._id}});
                    user3.save();
                    user4.save();
                    friend2.remove();
                    return res.redirect('back');
                }
        
            }
        
            const newFriendship = await Friendship.create({
                from_user:req.user._id,
                to_user :req.params.id
            });
            console.log(newFriendship);
            const new_user = await User.findById(req.user._id);
            const new_user1 = await User.findById(req.params.id);
            console.log("Users found");
            new_user.friendships.push(newFriendship);
            new_user1.friendships.push(newFriendship);
            new_user.save();
            new_user1.save();
            return res.redirect('back');
    }catch(err){

        console.log(err,"error in creating Friendship");                   
        return;

    }



}