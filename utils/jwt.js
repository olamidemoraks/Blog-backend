require("dotenv").config();
const jwt = require("jsonwebtoken");

const sendToken = (res, data) => {
  const token = jwt.sign({ id: user.id });
};
