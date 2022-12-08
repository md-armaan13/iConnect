const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/reset_mailer');
const queuereset= queue.resetqueue;

queuereset.process(function(job,done){

    console.log("reset worker id working",job.data);
   resetPasswordMailer.newToken(job.data.token);
   console.log("new token called");
    done();

})