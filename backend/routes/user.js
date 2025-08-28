const express = require("express");
const router = express.Router();
const {login,signUp,addWatchLater,getWatchLater,profile,refreshToken}=require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");


//view userlist
router.post("/login",login);

//add user details - Register
router.post("/",signUp);

//refresh token
router.get("/refresh-token",refreshToken)

//profile page
router.get("/",checkAuth,profile);

// //logout
// router.get('/logout',logout)

//add movies to watch later
router.put("/watchLater/:user_id",addWatchLater);

//view watch later list
router.get("/watchLater",getWatchLater );
 
module.exports = router;
