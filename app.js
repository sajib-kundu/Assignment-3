//Basic Lib import

const express = require('express');
const router  = require('./src/routes/api');

const app= new express();

const bodyParser = require('body-parser');
const rateLimit=require('express-rate-limit');
const helmet= require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp= require('hpp');
const cors = require('cors');


//Database Lib Import
const mongoose = require('mongoose');



//cors implemention
app.use(cors());


//  security Implemention
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


//Body Parser Implement
app.use(bodyParser.json());

app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({extended:true}));
let limiter=rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);


//Database Connection
let URL="mongodb://localhost:27017/todo"
let OPTION= {user:"",pass:"",autoIndex:true}
mongoose.connect(URL,OPTION).then(()=>{
    console.log("Database Connection Success");

}).catch((err)=>{

    console.log(err);
})
   

//Route Implement
app.use("/api/v1",router);
//404 not Found
app.use("*",(req,res)=>{

    res.status(404).json({data:"Not Found"})
})

module.exports=app;

