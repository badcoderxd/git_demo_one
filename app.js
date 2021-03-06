const express = require("express");
const app = express();
const mongoose = require("mongoose");
PORT= 5000;
const {MONGOURI} = require("./keys");

require('./models/user');

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
} );

mongoose.connection.on('connected',()=>{
    console.log("connected");
})

mongoose.connection.on('error',(err)=>{
    console.log("error",err);
})


app.get('/',(req,res)=>{
     res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})