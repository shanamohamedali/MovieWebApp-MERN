const { default: mongoose } = require("mongoose");
const Movies = require("../models/movieModel");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all movies
const getMovies = async (req, res) => {
  try {
    const movieList = await Movies.find()
      .select("_id title rating poster genre")
      .populate("genre");
    res.status(200).json(movieList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//add new movies
const addMovies = async (req, res) => {
  try {
    console.log("movie add request", req.body);


    const { title, rating, poster, genre } = req.body;

    // const isValidArray=Array.isArray(genre) ?
    // genre.filter((id)=>mongoose.Types.ObjectId.isValid(id)):[];

    console.log("new", genre);
    let movieDetails = {
      title,
      rating,
      poster,
      genre,
    };

    const isExist = await Movies.findOne({ title: req.body.title });
    if (isExist) {
      return res.status(404).json({
        message: "Movie with same title already exist",
      });
    }
    const response = await Movies.create(movieDetails);
    return res
      .status(200)
      .json({ response, message: "Movie added Successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//find movie based on genre
const findMovie = async (req, res) => {
  try {
    console.log("query...", req.query.genre_id);
    const movie = await Movies.find({
      genre: req.query.genre_id,
    })
      .select("_id title rating poster genre")
      .populate("genre", "title");

    if (movie.length != 0) {
      return res.status(200).json(movie);
    }
    return res.status(404).json({
      message: "No movies found on this genre",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

//get single movie details
const movieDetails = async (req, res) => {
  try {
    const movieDetails = await Movies.findById({ _id: req.params.movie_id })
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
    console.log("received data edit....", req.body);

    if (!req.body._id) {
      return res.status(404).json({ message: "request don't have _id" });
    }

    const movie = await Movies.findById(req.body._id);
    if (!movie) {
      return res.status(404).json({
        message: "No movie found with this id",
      });
    }

    const { title, rating, poster, genre } = req.body;
    if(movie.poster!==poster){
       const imageUrl = movie.poster.split("/");
    const publicId = imageUrl.splice(length - 1);
    console.log("...publicId",publicId);
    deletePoster(publicId);
    }
    const editData = {
      title,
      rating,
      poster,
      genre,
    };

    const updatedMovie = await Movies.findByIdAndUpdate(
      req.body._id,
      editData,
      { new: true }
    );

    res
      .status(200)
      .json({ data: updatedMovie, message: "Your data successfully updated" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//delete cloudinary image
const deletePoster = (publicId) => {
  cloudinary.uploader
    .destroy(publicId)
    .then((result) => {
      console.log(result); // Contains information about the deletion
      if (result.result === "ok") {
        console.log("Image deleted successfully from Cloudinary.");
      } else {
        console.log("Failed to delete image:", result.result);
      }
    })
    .catch((error) => {
      console.error("Error deleting image from Cloudinary:", error);
    });
};

//delete movie
const deleteMovie = async (req, res) => {
  try {
    console.log("...del", req.body);
    const movie = await Movies.findById(req.body._id);
    const { poster } = movie;
    console.log("old poster",poster);

    let imageUrl = poster.split("/");
     console.log("..split",imageUrl);
    let public_Id = imageUrl.pop();
    let publicIdwithoutext=public_Id.split(".")[0];
;
    console.log("...publicId",publicIdwithoutext);
    deletePoster(publicIdwithoutext);

    if (!movie) {
      return res.status(404).json({
        message: "No movies found with this id",
      });
    }
    const deletedMovie = await Movies.findByIdAndDelete(req.body._id);
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    message: error.message;
  }
};

module.exports = {
  addMovies,
  getMovies,
  editMovie,
  movieDetails,
  deleteMovie,
  findMovie,
};

// //delete uploaded files from folder
// const deleteUploadedFiles = (files) => {
//   const deleteFile = (file) => {
//     fs.unlink(file.path, (err) => {
//       if (err) console.log("failed to delete file", err);
//     });
//   };
//   if (files?.poster) deleteFile(files.poster[0]);
//   if (files?.thumbnail) deleteFile(files.thumbnail[0]);
// };