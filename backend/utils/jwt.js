const jwt=require("jsonwebtoken");

const generateAccessToken=(user_id)=>{
    return jwt.sign({
  data: user_id
}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken=(user_id)=>{
    return jwt.sign({
  data: user_id
}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
};

const verifyAccessToken=(token)=>{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports={generateAccessToken,verifyAccessToken,generateRefreshToken};