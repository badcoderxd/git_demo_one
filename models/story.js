const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model("Story",storySchema);