const Movies=require("../models/movieModel");




//get all movies
 const getMovies=async (req, res)=> {
  try {
    const movieList = await Movies.find().select(
      "_id title rating poster thumbnail genre"
    );
    res.status(200).json(movieList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//add new movies
const addMovies=async (req, res) => {
    try {
      console.log("movie add request",req.body);
      const poster = req.files.poster ? req.files.poster[0].filename : "";
      const thumbnail = req.files.thumbnail
        ? req.files.thumbnail[0].filename
        : "";

      //const poster = req.file.filename;
      //console.log("filename.......",poster);
      console.log("files..........", req.files);

      const { title, rating, genre } = req.body;
      const movieDetails = {
        title,
        rating,
        poster,
        thumbnail,
        genre,
      };

      const isExist = await Movies.findOne({ title: req.body.title });
      if (!isExist) {
        const response = await Movies.create(movieDetails);
        return res.status(200).json(response);
      }
      return res.status(400).json({
        message: "Movie with same title already exist",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  
};

//get single movie details
const movieDetails=async (req, res) => {
  try {
    const movieDetails = await Movies.find({ _id: req.params.movie_id })
      .select(" _id title rating poster genre")
      .populate("genre");

    res.status(200).json(movieDetails);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//edit movie
const editMovie= async (req, res) => {
    try {

      const poster = req.files.poster ? req.files.poster[0].filename : null;
      const thumbnail = req.files.thumbnail
        ? req.files.thumbnail[0].filename
        : null;
      const { title, rating, genre } = req.body;
      const editData = {
        title,
        rating,
        poster,
        thumbnail,
        genre,
      };
      const updatedMovie = await Movies.findByIdAndUpdate(
        req.body._id,
        editData
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  //delete movie
   const deleteMovie=async (req, res) => {
  try {
    const deletedMovie = await Movies.findByIdAndDelete(req.body._id);
    if (deletedMovie) {
      return res.status(200).json(deletedMovie);
    }
    return res.status(400).json({
    message: "Data not deleted"
    });
  } catch (error) {
    message: error.message;
  }
};

module.exports={addMovies,getMovies,editMovie,movieDetails,deleteMovie};