require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const app = express();
const ErrorMiddleware = require("./middlewares/errors");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");

const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["https://blog-mymind.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api/v1", userRoute, postRoute);

app.get("/test", (req, res, next) => {
  res.status(200).send("Welcome to mymind");
});

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
  connectDB();
});
