
const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comments/Comment");
const blockUser = require("../../utils/isBlock");
const validateMongodbId = require("../../utils/validateMongodbID");


//----------------create comment------------
const createCommentController = expressAsyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;
  //check if user is blocked
  blockUser(user);
 //2.Get the post Id
  const { postId, description } = req.body;
  console.log(description);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
// }
});

//--------fetch comments---------

const fetchCommentController = expressAsyncHandler(async (req, res) => {
 try {
   const comments= await Comment.find({}).sort("-created") ;
   res.json(comments);

 } catch (error) {
    res.json(error);
 }
})

//---------fetch single comment---------

const fetchSingleCommentController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
try {
      const comment = await Comment.findById(id);
      res.json(comment);
} catch (error) {
  res.json(error);  
}
})

//--------update comments---------

const updateCommentController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const update = await Comment.findByIdAndUpdate(
        id,
        {
          // post: req.body?.postId,
          user: req?.user,
          description: req?.body?.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(update);
    } catch (error) {
      res.json(error);
    }
  });
  

  //--------delete comments---------

  const deleteCommentController = expressAsyncHandler(async (req, res) =>{
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error)
  }
  })
module.exports = { createCommentController, fetchCommentController, fetchSingleCommentController, updateCommentController,deleteCommentController };