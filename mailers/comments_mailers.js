const nodeMailer = require('../config/nodemailer');



//this is another way of exporting the method
exports.newComment= (comment)=>{
    let htmlString =   nodeMailer.renderTemplate({comment :comment},'/comments/new_comments.ejs')
    nodeMailer.transporter.sendMail({
        from : 'md.2125cse1047@kiet.edu',
        to : comment.user.email,
        subject : "New comment added",
        html :htmlString
    },(err,info)=>{
        if(err){console.log('Error in sending the mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}