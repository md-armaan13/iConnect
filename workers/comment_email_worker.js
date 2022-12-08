const queue = require('../config/kue');
const emailqueue = queue.emailqueue;


const commentsMailer = require('../mailers/comments_mailers');
//process function which has to be executed by worker
emailqueue.process(function(job,done){ 

    console.log("email worker id working",job.data);
    //console.log(job);
    commentsMailer.newComment(job.data.comment);
    done();

})