const express = require('express');
const { createPostController, 
    fetchPostController, 
    fetchSinglePostController ,
    updatePostController ,
     deletePostContoller,
     toggleAddLikeToPostController,
     toggleAddDislikeToPostController,
     savePostController,
     fetchSavedPostController,
     deleteSavedPostController} = require('../../controllers/posts/postController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload ,postImageResize} = require('../../middlewares/uploads/photoUpload');
const  postRoute = express.Router();

postRoute.put('/likes',authMiddleware,toggleAddLikeToPostController)
postRoute.put('/dislikes',authMiddleware,toggleAddDislikeToPostController)
postRoute.post("/",authMiddleware,  photoUpload.single("image"),postImageResize ,createPostController);
postRoute.get("/",fetchPostController);

postRoute.post("/save",authMiddleware,savePostController);
postRoute.get("/saved-list",authMiddleware,fetchSavedPostController);
postRoute.delete("/saved/:id",authMiddleware,deleteSavedPostController);

postRoute.get("/:id",fetchSinglePostController);
postRoute.put("/:id",authMiddleware, updatePostController)
postRoute.delete("/:id",authMiddleware, deletePostContoller)
// postRoute.post("/:id",reportPostController);

module.exports = postRoute;