const { default: mongoose } = require("mongoose");
const Movies = require("../models/movieModel");
const fs = require("fs");
const path = require("path");

//get all movies
const getMovies = async (req, res) => {
  try {
    const movieList = await Movies.find()
      .select("_id title rating poster thumbnail genre")
      .populate("genre");
    res.status(200).json(movieList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//delete uploaded files from folder
const deleteUploadedFiles = (files) => {
  const deleteFile = (file) => {
    fs.unlink(file.path, (err) => {
      if (err) console.log("failed to delete file", err);
    });
  };
  if (files?.poster) deleteFile(files.poster[0]);
  if (files?.thumbnail) deleteFile(files.thumbnail[0]);
};
//add new movies
const addMovies = async (req, res) => {
  try {
    console.log("movie add request", req.body);
    const poster = req.files.poster ? req.files.poster[0].filename : "";
    const thumbnail = req.files.thumbnail
      ? req.files.thumbnail[0].filename
      : "";

    console.log("files..........", req.files);

    const { title, rating, genre } = req.body;

    // const isValidArray=Array.isArray(genre) ?
    // genre.filter((id)=>mongoose.Types.ObjectId.isValid(id)):[];

    console.log("new", genre);
    let movieDetails = {
      title,
      rating,
      poster,
      thumbnail,
      genre,
    };

    const isExist = await Movies.findOne({ title: req.body.title });
    if (isExist) {
      deleteUploadedFiles(req.files);
      return res.status(404).json({
        message: "Movie with same title already exist",
      });
    }
    const response = await Movies.create(movieDetails);
    return res.status(200).json(response);
  } catch (error) {
    deleteUploadedFiles(req.files);
    res.status(400).json({
      message: error.message,
    });
  }
};

//get single movie details
const movieDetails = async (req, res) => {
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
const editMovie = async (req, res) => {
  try {
    console.log("received data edit....",req.body);
   
      if(!req.body._id){
        return res.status(404).json({message:"request don't have _id"});
      }

      const movie = await Movies.findById(req.body._id);
    if (!movie) {
      return res.status(404).json({
        message: "No movie found with this id",
      });
    }

     const poster = req.files.poster ? req.files.poster[0].filename : movie.poster;
    const thumbnail = req.files.thumbnail
      ? req.files.thumbnail[0].filename
      : movie.thumbnail;

    const { title, rating, genre } = req.body;
    const editData = {
      title,
      rating,
      poster,
      thumbnail,
      genre,
    };
    
    const deleteFile = (filename) => {
      if (!filename) return;
      const filePath = path.join(__dirname, "..", "public", "images", filename);
      fs.unlink(filePath, (err) => {
        if (err) console.log("failed file deletion");
      });
    };
     if (req.files.poster) deleteFile(movie.poster);
    if(req.files.thumbnail) deleteFile(movie.thumbnail);
    const updatedMovie = await Movies.findByIdAndUpdate(req.body._id, editData,{new:true});

    res.status(200).json({data:updatedMovie,
      message:"Your data successfully updated"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//delete movie
const deleteMovie = async (req, res) => {
  try {
    console.log("...del", req.body);
    const movie = await Movies.findById(req.body._id);

    if (!movie) {
      return res.status(404).json({
        message: "No movies found with this id",
      });
    }
    const deleteFile = (filename) => {
      if (!filename) return;
      const filePath = path.join(__dirname, "..", "public", "images", filename);
      fs.unlink(filePath, (err) => {
        if (err) console.log("failed to delete files", err);
      });
    };
    deleteFile(movie.poster);
    deleteFile(movie.thumbnail);

    const deletedMovie = await Movies.findByIdAndDelete(req.body._id);
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    message: error.message;
  }
};

module.exports = { addMovies, getMovies, editMovie, movieDetails, deleteMovie };
