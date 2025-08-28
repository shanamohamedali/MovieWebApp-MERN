const Genre = require("../models/genreModel");

const getGenre = async (req, res) => {
  try {
    const genreList = await Genre.find();
    res.status(200).json(genreList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addGenre = async (req, res) => {
  try {
    console.log("genre title", req.body);
    const isExist = await Genre.find({ title: req.body.title });
    console.log(".....", isExist.length);
    if (isExist.length !== 0) {
         return res.status(404).json({ message: "This title already exist" });
    }else{
         const response = await Genre.create(req.body);
      return res.status(200).json({
        message: "Data added successfully",
      });
    
    }
   
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { getGenre, addGenre };
