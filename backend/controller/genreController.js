const Genre=require("../models/genreModel");

const getGenre=async(req,res)=>{
    try{
         const genreList=await Genre.find();
         res.status(200).json(genreList);
    }catch(error)
    {
        res.status(400).json({
            message:error.message
        })
    }
}

const addGenre=async(req,res)=>{
    try{
        const response=await Genre.create(req.body);
        res.status(200).json(response);

    }catch(error)
    {
        res.status(400).json({
            message:error.message
        })
    }
}

module.exports={getGenre,addGenre};