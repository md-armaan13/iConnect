const kue = require('kue')
const Queue = require('bull');
// const queue = kue.createQueue();
module.exports.emailqueue= new Queue('emails','redis://red-ce950e94rebc0ptqdpgg:6379');

module.exports.resetqueue =  new Queue('reset','redis://red-ce950e94rebc0ptqdpgg:6379') ;