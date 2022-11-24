const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/reset_mailer');


queue.process('reset',function(job,done){

    console.log("reset worker id working",job.data);
   resetPasswordMailer.newToken(job.data);
    done();

})