const express = require("express");
const router = express.Router();

const nodemailer = require("../config/nodemailerconfig");

const mongoose = require("mongoose");
const User = mongoose.model("User")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = require("../keys");

const requireLogin = require("../middlewares/requireLogin");

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello");
})

router.get('/imexample',(req,res)=>{
    res.send("hello who are you");
})

router.post('/signup',(req,res)=>{
    const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
    const {name,email,password} = req.body;
    if(!email || !password || !name ){
       return res.status(422).json({error:"please add all the feilds"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with this username"})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user = new User({
                email,
                password:hashedPassword,
                name,
                confirmationCode: token,
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully and confirm your mail"});
                nodemailer.sendConfirmationEmail(
                    user.name,
                    user.email,
                    user.confirmationCode
                  );

            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(422).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if (savedUser.status != "Active") {
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
          }

        if(!savedUser)
        {
          return res.status(422).json({error:"invalid username or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                // res.json({message:"succussfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else
            {
                return res.status(422).json({error:"invalid username password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.get('/getusers',requireLogin,(req,res)=>{
    User.find()
    .then(users =>{
        res.json({users})
    })
})

router.get('/signup/confirm/:confirmationCode',(req,res,next)=>{
    User.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          else{
              res.status(200).send({message:"succusfully confirmed the email id"})
          }
          user.status = "Active";
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
          console.log(user);
        })
        .catch((e) => console.log("error", e));
})
module.exports = router
