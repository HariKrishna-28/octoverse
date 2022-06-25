const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./components/connection");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const searchRoute = require("./routes/search");

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/search", searchRoute);

// Database connection
connectDb();

app.get("/", (req, res) => {
  res.send("Octoverse up");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up");
});
