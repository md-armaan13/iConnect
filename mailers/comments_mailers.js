const nodeMailer = require('../config/nodemailer');



//this is another way of exporting the method
exports.newComment= (comment)=>{
    console.log('inside new comment mailer');

    nodeMailer.transporter.sendMail({
        from : 'md.2125cse1047@kiet.edu',
        to : comment.user.email,
        subject : "New comment added",
        html :'<h1> Hey , Your Comment is added</h1>'
    },(err,info)=>{
        if(err){console.log('Error in sending the mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}