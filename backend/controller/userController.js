const Users = require("../models/usersModel");
const {
  generateHashPassword,
  compareHashPassword,
} = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

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
        role:"user",
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

//login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username }).select(
      "_id firstname password role"
    );
    //console.log("....login user",user);
    if (!user) {
      return res.status(404).json({ message: "Incorrect username/password" });
    }
    const response = await compareHashPassword(password, user.password);
    if (!response) {
      return res.status(404).json({ message: "Incorrect username/password" });
    }
    const accessToken = await generateAccessToken(user._id);
    // const refreshToken = await generateRefreshToken(user._id);
    // console.log("login access...", accessToken);
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    // });
    res.status(200).json({
      accessToken,
      firstname: user.firstname,
      role:user.role,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  console.log("cookies,,,", req.cookies);
  const user_id = await verifyRefreshToken(req.cookies.refreshToken);
  console.log("...refresh verfy return id", user_id);

  if (!user_id) {
    res.status(401).json("Refresh token expired/unauthorised");
  }
  const accessToken = await generateAccessToken(user_id);
  const refreshToken = await generateRefreshToken(user_id);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ accessToken });
};

//profile
const profile = async (req, res) => {
  try {
    const { _id } = req.user_id;
    console.log("...req user id", req.user_id);
    const user = await Users.findById(req.user_id).select("-password");
    console.log("...userdata", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//logout
// const logout=async(req,res)=>{
//   res.clearCookie(refreshToken);
//   res.status(200).json({
//     message:"Logout succesfful"
//   })
// }

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

module.exports = {
  login,
  signUp,
  addWatchLater,
  getWatchLater,
  profile,
  refreshToken,

 
};
