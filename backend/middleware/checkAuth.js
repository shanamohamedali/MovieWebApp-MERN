const { verifyAccessToken } = require("../utils/jwt");

exports.checkAuth = (req, res, next) => {
  try {
    console.log("hello check auth")
    console.log(".....",req.headers.authorisation);
    const token = req.headers.authorisation;
    if (!token) {
      return res.status(401).json({ message: "UnAuthorised Access" });
    }
    const response = verifyAccessToken(token);
    console.log("response of verify token..", response.data);
    req.user_id = response.data;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};
