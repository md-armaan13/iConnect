const mongoose = require('mongoose');
const env = require('./environment');

const db=mongoose.connect('mongodb+srv://MdArmaan13:1372001a@cluster0.inrrklr.mongodb.net/?retryWrites=true&w=majority',{
    // useNewUrlParser: true,
    // useCreateIndex : true,
    // useUnifiedToplogy: true,
    // useFindAndModify : false,
 }).then(()=>{
  console.log("connection success")

 }).catch((err)=>{
  console.log(err);
 });

//  const db = mongoose.connection;

//  db.on('error', console.error.bind(console, "Error connecting te MongoD8"));

//   db.once('open',function(){

//     console.log('connected to data base');
//   });

  module.exports= db;
