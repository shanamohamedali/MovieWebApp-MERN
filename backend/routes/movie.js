const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {getMovies, addMovies,movieDetails, editMovie,deleteMovie} = require("../controller/movieController");

//multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

//view all movies
router.get("/",getMovies );

//add new movies
router.post("/",upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]) , addMovies);

//view single movie details
router.get("/:movie_id",movieDetails);

//edit movie details
router.put("/",upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),editMovie );

//delete movie
router.delete("/",deleteMovie );

module.exports = router;
