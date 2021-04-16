const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Story = mongoose.model("Story");

router.post('/createstory',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"please add all feilds"})
    }
    const story = new Story({
        title,
        body,
        postedBy:req.user
    }) 
    console.log(req.user);
    story.save().then(result=>{
        res.json({story:"Story created successfully"})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getallstory',requireLogin,(req,res)=>{
    Story.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/getstoryme',requireLogin,(req,res)=>{
    Story.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mystory=>{
        res.json({mystory})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put('/likes',requireLogin,(req,res)=>{
    Story.findByIdAndUpdate(req.body.storyId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else
        {
            res.json(result)
        }
    })
})

router.put('/unlike',requireLogin,(req,res)=>{
    Story.findByIdAndUpdate(req.body.storyId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else
        {
            res.json(result)
        }
    })
})

module.exports = router