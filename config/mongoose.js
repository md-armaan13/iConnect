const mongoose = require('mongoose');


 mongoose.connect('mongodb://localhost/iConnect_development');

 const db = mongoose.connection;

 db.on('error', console.error.bind(console, "Error connecting te MongoD8"));

  db.once('open',)