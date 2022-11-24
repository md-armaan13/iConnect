const nodeMailer = require('../config/nodemailer');



exports.newToken= (token)=>{
    let htmlString =   nodeMailer.renderTemplate({token :token},'/reset-password/reset_user_password.ejs')
    nodeMailer.transporter.sendMail({
        from : 'md.2125cse1047@kiet.edu',
        to : token.user.email,
        subject : "Reset Password",
        html :htmlString
    },(err,info)=>{
        if(err){console.log('Error in sending the mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}