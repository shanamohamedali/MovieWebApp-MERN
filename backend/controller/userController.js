const Users = require("../models/usersModel");
const {
  generateHashPassword,
  compareHashPassword,
} = require("../utils/bcrypt");
const { generateAccessToken,generateRefreshToken } = require("../utils/jwt");

//login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username }).select("_id firstname password");
    //console.log("....login user",user);
    if (user) {
      const response = await compareHashPassword(password, user.password);
      if (response) {
        const accessToken = await generateAccessToken(user._id);
        const refreshToken=await generateRefreshToken(user._id);
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          secure:true,
        });
        return res.status(200).json({
          firstname: user.firstname,
          accessToken,
          message: "logged in successfully",
        });
      }
      return res.status(404).json({ message: "Incorrect username/password" });
    }
    return res.status(404).json({ message: "Incorrect username/password" });
  } catch (error) {
    res.status(404).json({
      message:error.message ,
    });
  }
};

//add user details - SignUp
const signUp = async (req, res) => {
  try {
    console.log("req data", req.body);
    const isExist = await Users.findOne({ name: req.body.username });
    if (!isExist) {
      const hash = await generateHashPassword(req.body.password);
      const userData = {
        firstname: req.body.firstname,
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        password: hash,
        movies: req.body.movie_id,
      };
      const usersList = await Users.create(userData);
      return res.status(200).json(usersList);
    }

    return res.status(400).json({
      message: "User with this username already exist",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//profile
const profile = async (req, res) => {
  try {
    const {_id }= req.user_id;
    console.log("...req user id", req.user_id);
    const user = await Users.findById(req.user_id)
    .select("-password");
    console.log("...userdata", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//add movies to watch later
const addWatchLater = async (req, res) => {
  try {
    const movie_id = req.body.movie_id;
    const updatedWatchLater = await Users.findByIdAndUpdate(
      req.params.user_id,
      {
        //$addToSet: { movies: movie_id }, //avoid duplication
        $push: {
          movies: req.body.movie_id,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedWatchLater);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//view watch later list
const getWatchLater = async (req, res) => {
  try {
    const watchLaterList = await Users.find({ _id: req.body.user_id })
      .select("movies")
      .populate("movies");
    if (watchLaterList) {
      //const newWatchList=[...new set(watchLaterList)]; //avoid duplicates
      res.status(200).json(watchLaterList);
    }
    res.status(400).json({
      message: "Empty! There is no movies in your list",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { login, signUp, addWatchLater, getWatchLater,profile };
