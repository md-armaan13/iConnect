module.exports.home= (req,res)=>{ // exporting the fuction so that router can use

    return res.render('home',{
        title : "Home",
    });
};
