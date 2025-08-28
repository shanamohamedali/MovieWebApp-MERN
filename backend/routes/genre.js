const express = require("express");
const router = express.Router();
const { getGenre, addGenre } = require("../controller/genreController");

//view genres
router.get("/", getGenre);
router.post("/", addGenre);

module.exports = router;
