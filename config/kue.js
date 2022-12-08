const kue = require('kue')
const Queue = require('bull');
// const queue = kue.createQueue();
module.exports.emailqueue= new Queue('emails',{
    redis : {
        port: 6379, 
      host: 'oregon-redis.render.com',
      username: 'red-ce950e94rebc0ptqdpgg',
      password : 'WhsVNyyNnnO6MMbNdxqK55Oj0GM0o5A2'
 
    }
});
rediss://red-ce950e94rebc0ptqdpgg:WhsVNyyNnnO6MMbNdxqK55Oj0GM0o5A2@oregon-redis.render.com:6379
module.exports.resetqueue =  new Queue('reset',{
    redis : {
        host : '127.0.0.1',
        port : '6379'

    }
}) ;