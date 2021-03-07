const express = require("express");
const router = express.Router();

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
    res.send("hello im example im reachble");
})

router.post('/signup',(req,res)=>{
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
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"});
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

router.get('/getusers',(req,res)=>{
    User.find()
    .then(users =>{
        res.json({users})
    })
})

module.exports = router