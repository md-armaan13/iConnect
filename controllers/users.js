module.exports.user_profile= (req,res)=>{ // exporting the fuction so that router can use

    return res.send('<h1>Users Profile</h1>');

}


module.exports.profile= (req,res)=>{ 

    return res.send('<h1>Armaan"s Profile</h1>');

}

module.exports.post= (req,res)=>{ 

    return res.send('<h1>Armaan"s post</h1>');

}

module.exports.Sign_In= (req,res)=>{

    return res.render('user_sign_in',{
        title: "iConnect | Sign In"
    });
};


