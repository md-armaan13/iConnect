const express= require('express');
const app= express();
const port=8000;

// using express router 
app.use('/',require('./routes/index')); 



// SET UP VIEW ENGINE
app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,function(err) {

    if(err) { 
        //console.log ('Error in running the server ' , err ) ;
            console.log(`Error in running the server : ${err}`); // backtick "Interpolation"
    }
   // console.log ( ' Yup ! My Express Server is running on Port : ' , port ) ;
        console.log(`My Express Server is running on Port : ${port}`);
} ) ;