const mongoose=require("mongoose");

const genreSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
        maxLength:255,
        
    }
})
module.exports=mongoose.model("Genre",genreSchema);