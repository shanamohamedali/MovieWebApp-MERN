const { kMaxLength } = require("buffer");
const mongoose=require("mongoose");
const { type } = require("os");

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:255,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    poster:{
        type: String,
    },
    genre:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genre",
    },
]
})
module.exports=mongoose.model("Movies",movieSchema)