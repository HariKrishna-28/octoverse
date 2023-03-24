const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./src/components/connection");
const userRoute = require("./src/routes/users");
const authRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/posts");
const searchRoute = require("./src/routes/search");
const newsRoute = require("./src/routes/news");
const activityRoute = require("./src/routes/activity");
const offensiveCheckRoute = require("./src/routes/moderation");
const serviceAccount = require("./src/config/admin-config");
const { VerifyToken } = require("./src/middleware/Middleware");

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Database connection
// connectDb();

app.get("/", (_, res) => {
  res.send("Octoverse up");
});

// app.use(VerifyToken);
// app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/search", searchRoute);
app.use("/api/news", newsRoute);
app.use("/api/activity", activityRoute);
app.use("/api/hs", offensiveCheckRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up");
});
