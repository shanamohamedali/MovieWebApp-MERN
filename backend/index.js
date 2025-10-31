const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser=require("cookie-parser");
const connectDb = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/user");
const movieRouter=require("./routes/movie");
const genreRouter=require('./routes/genre');

// app.use(cors({
//   origin:"http://localhost:5173",
//   credentials:true,
// }));
// app.use(cors({
//   origin:"https://movie-web-app-mern-client.vercel.app/",
//   credentials:true,
// }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public/images',express.static('public/images'));
connectDb();

app.use('/api/users', userRouter);
app.use('/api/movies',movieRouter);
app.use('/api/genre',genreRouter);


const PORT = 3007;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
