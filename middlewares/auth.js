const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const Authorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("User not authorized", 401));
    }
    let decodedData = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decodedData) {
      return next(
        new ErrorHandler(
          "Token has expired, please login to acccess this resource",
          401
        )
      );
    }
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

module.exports = Authorized;
