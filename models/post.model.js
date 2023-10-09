const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: Object,
    comment: String,
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    photo: {
      public_id: {
        type: String,
      },
      url: {
        // required: true,
        type: String,
      },
    },
    readTime: String,
    category: String,
    author: Object,
    likes: {
      type: [String],
      default: [],
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
