const express = require("express");
const app = express();
const mongoose = require("mongoose");
PORT= process.env.PORT || 5000;
const {MONGOURI} = require("./keys");
const cors = require("cors");

var corsOptions = {
    origin: "https://nodejspract.herokuapp.com"
  };

app.use(cors(corsOptions));

require('./models/user');

app.use(express.json())

app.use(require('./routes/auth'));


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


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
