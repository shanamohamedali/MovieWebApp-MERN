const express = require("express");
const router = express.Router();

const {
  getMovies,
  addMovies,
  movieDetails,
  editMovie,
  deleteMovie,
  findMovie,
} = require("../controller/movieController");

//view all movies
router.get("/", getMovies);

//add new movies
router.post("/", addMovies);

//get movies based on genres
router.get("/search", findMovie);

//view single movie details
router.get("/:movie_id", movieDetails);

//edit movie details
router.put(
  "/",
  editMovie
);

//delete movie
router.delete("/", deleteMovie);

module.exports = router;
