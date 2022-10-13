const mongoose = require("mongoose");

const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        
      },
  },
  
  {
    timestamps: true,
  }
);

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

module.exports = SavedPost;