const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailers');
//process function which has to be executed by worker
queue.process('emails',function(job,done){

    console.log("email worker id working",job.data);
    commentsMailer.newComment(job.data);
    done();

})