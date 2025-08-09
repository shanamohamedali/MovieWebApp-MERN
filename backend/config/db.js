const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_Db_URL);
    console.log("Database connected to:", connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
