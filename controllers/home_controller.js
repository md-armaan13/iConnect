module.exports.home= (req,res)=>{ // exporting the fuction so that router can use
        res.cookie('user',23);
    return res.render('home',{
        title : "Home",
    });
};
