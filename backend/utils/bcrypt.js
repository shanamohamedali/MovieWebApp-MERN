const bcrypt=require("bcrypt");

const generateHashPassword=(password)=>{
    return bcrypt.hashSync(password,10);
    };

const compareHashPassword=(password,hashPassword)=>{
    return bcrypt.compareSync(password,hashPassword);
}

module.exports={generateHashPassword,compareHashPassword}