const User = require("../models/user.model.js");
const ErrorHandler = require("../utils/errorHandler");

const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return next(new ErrorHandler("Please enter your credentials", 400));
    }
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return next(new ErrorHandler("Email Already exist", 400));
    }

    const user = await User.create({
      email,
      username,
      password,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email or password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const accessToken = user.SignAccessToken();
    res.status(200).json({
      id: user._id,
      token: accessToken,
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
};
