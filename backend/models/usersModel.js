const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    lowaercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required:"true",
    },
    role:{
      type:String,
    },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
