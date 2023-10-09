const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, { family: 4 }).then((data) => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
