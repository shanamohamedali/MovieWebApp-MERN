const jwt=require("jsonwebtoken");

const generateAccessToken=(user_id)=>{
    return jwt.sign({
  data: user_id
}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
};

const generateRefreshToken=(user_id)=>{
    return jwt.sign({
  data: user_id
}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
};

const verifyAccessToken=(token)=>{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken=(refreshToken)=>{
  if(!refreshToken){
    return false;
  }
  const valid=jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  console.log("response veriy refresh token",valid);
  if(valid){
    return user_id=valid.data;
  }
  return false;
}

module.exports={generateAccessToken,verifyAccessToken,generateRefreshToken,verifyRefreshToken};