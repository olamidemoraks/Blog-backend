const express = require("express");
const {
  createPost,
  getAllPost,
  getPost,
  getMyPost,
  deleteMyPost,
  addCommentToPost,
  editMyPost,
  likePost,
} = require("../controllers/post.controller");
const Authorized = require("../middlewares/auth");
const postRoute = express.Router();

postRoute.post("/create-post", Authorized, createPost);
postRoute.get("/get-all-post", getAllPost);
postRoute.get("/get-post/:id", getPost);
postRoute.get("/get-my-post", Authorized, getMyPost);
postRoute.delete("/delete-my-post/:id", Authorized, deleteMyPost);
postRoute.put("/comment-post", Authorized, addCommentToPost);
postRoute.put("/edit-my-post/:id", Authorized, editMyPost);
postRoute.put("/like-post", Authorized, likePost);

module.exports = postRoute;
