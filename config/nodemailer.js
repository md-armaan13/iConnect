const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {

        user : 'md.2125cse1047@kiet.edu',
        pass : '1372001@'
    }

})


let renderTemplate= (data,relativePath)=>{
    let mailHtml;
    ejs.render(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
           if(err){console.log("error in rendering template mailer",err);}
           mailHtml = template;

        }
    )
    return mailHtml;
}

module.exports={
    transporter :transporter,
    renderTemplate : renderTemplate
}