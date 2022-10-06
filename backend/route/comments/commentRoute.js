const express = require('express');
const { 
    createCommentController,
     fetchCommentController,
     fetchSingleCommentController,
     updateCommentController,
     deleteCommentController
     } = require('../../controllers/comments/commentController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const commentRoute = express.Router();

commentRoute.post("/",authMiddleware,createCommentController);
commentRoute.get("/",authMiddleware ,fetchCommentController);
commentRoute.get("/:id",authMiddleware,fetchSingleCommentController);
commentRoute.put("/:id",authMiddleware,updateCommentController);
commentRoute.delete("/:id",authMiddleware,deleteCommentController);
module.exports = commentRoute;