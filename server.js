const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookie_parser = require("cookie-parser");

const PORT = process.env.PORT || 5001;

//middleware content json
app.use(express.json());

//cookies parse
app.use(cookie_parser());

app.get('/setcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
});

//routing
const movieRouter = require("./routers/movieRouter");
const userRouter = require("./routers/userRouter");
const { verifyToken, verifyUser } = require("./middleware/verifyToken");

app.use("/api/movies", verifyUser , movieRouter);
app.use("/api/users", userRouter);

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//server connection
app.listen(PORT, () => {
  try {
    console.log(`Server is running on ${PORT} port..`);
  } catch (error) {
    console.log(error);
  }
});
