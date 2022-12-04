const env = require('./environment');


const fs = require('fs');
const path = require('path');


module.exports = (app)=>{
    // Creating assetPath  a function which is accesible in globals
    app.locals.assetPath = function(filePath){

        if(env.name=='development'){
            return filePath;
        }
        // here we are returning the coressponding key to the manifest
        return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];


    }
}