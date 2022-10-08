const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const validateMongodbId = require("../../utils/validateMongodbID");
const { response } = require("express");
const blockUser = require("../../utils/isBlock");



//------------------create post---------------

const createPostController= expressAsyncHandler(async (req,res)=>{
    console.log(req.file)
    const { _id } = req.user;
   blockUser(req.user);
    // validateMongodbId(req.body.user);
    //Check for bad words
    const filter = new Filter();
    const isProfane = filter.isProfane(req.body.title, req.body.description);
    //Block user
    if (isProfane) {
      await User.findByIdAndUpdate(_id, {
        isBlocked: true,
      });
      throw new Error(
        "Creating Failed because it contains profane words and you have been blocked"
      );
    }

     //prevent user if his account is a starter account
   if (
     req?.user?.accountType === "Starter Account" &&
     req?.user?.postCount >= 2
   ) {
     throw new Error("Starter Account can only create two posts,Get more Followers");
   }

      //get the path to the image
  const localPath = `public/images/posts/${req.file.filename}` ;
  // upload to cloudinary
const imgUploaded = await cloudinaryUploadImg(localPath);
  
     try {
     const post = await Post.create({
        ...req.body,
        image:imgUploaded?.url,
        user:_id,

    });
      res.json(post);
    // res.json(imgUploaded);


    
    //update the user post count
    await User.findByIdAndUpdate(
      _id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );
   
      //remove uploaded images
    fs.unlinkSync(localPath)

    } catch (error) {
      res.json(error);
    }
})

//-----------fetch all posts---------

const fetchPostController = expressAsyncHandler(async (req, res) => {
  const hasCategory= req.query.category;
    try {
     // check if it has a category
      if(hasCategory){
        const posts = await Post.find({category:hasCategory}).populate("user").populate("comments").sort('-createdAt');
        res.json(posts);
      }else{
        const posts = await Post.find({}).populate("user").populate("comments").sort('-createdAt');
        res.json(posts);
    }
    } catch (error) {
        res.json(error);
    }
 res.json("fetch posts");
})
//----------fetch a single post-----------

const fetchSinglePostController = expressAsyncHandler(async (req, res)=>{
  const { id } = req.params;
  validateMongodbId(id);
try {
  const post = await Post.findById(id).populate('user').populate("disLikes").populate("likes").populate("comments");
  //update number of views
  await Post.findByIdAndUpdate(id,{
  $inc:{numViews:1}
  },{new:true})
  res.json(post);
} catch (error) {
  res.json(error);
}
})

//------------update post controller-----------
const updatePostController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id)
 try {
  const post = await Post.findByIdAndUpdate(id,{
    ...req.body,
    user: req.user?._id,
  }, {new:true})
  res.json(post);
 } catch (error) {
  res.json(error)
 }
})

//----------delete post------------------

const deletePostContoller = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id)
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post)

    

  } catch (error) {
    res.json(error)
  }
})

//---------- like post---------------

const toggleAddLikeToPostController = expressAsyncHandler(async (req, res) => {
  //find the post to be liked

  const { postId } = req.body;
  const post = await Post.findById(postId);
  //find the login user
  const loginUserId = req?.user?._id;

  //find the user has liked this post ?
  const isLiked = post?.isLiked;
  //check if this user has already dislikes this post?
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  // remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );

    res.json(post);
  }
  //Toggle
  //remove the user if  he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//---------------dislike post--------------
const toggleAddDislikeToPostController =expressAsyncHandler(async (req, res) => {
 //find the post to be dislike
 const {postId} = req.body;
 const post = await Post.findById(postId);
 //find the login user
 const loginUserId = req?.user?._id;
 //check if this user has already dislikes
const isDisLiked = post?.isDisLiked 
//check if this user is already liked the post
const alreadyLiked = post?.likes?.find(
  userId=>userId.toString() === loginUserId.toString()
);
//remove this user from likes array if it exists
if(alreadyLiked){
  const post = await Post.findByIdAndUpdate(postId,
    {
      $pull:{likes:loginUserId},
      isLiked: false
    },
    {
      new: true
    }
    );
    res.json(post);
}
//toggling
//remove this user from dislikes if already disliked
if(isDisLiked){
  const post = await Post.findByIdAndUpdate(postId,
    {
      $pull:{disLikes:loginUserId},
      isDisLiked: false,
    },{new:true}
  );
  res.json(post);
}else{
  const post = await Post.findByIdAndUpdate(postId,
    {
       $push:{disLikes:loginUserId},
       isDisLiked:true,
    },{new:true}
  );
  res.json(post);
}

})

//-------------report---------------
const reportPostController = expressAsyncHandler(async(req,res) =>{
  const {postId} = req.body;
  validateMongodbId(postId);

await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { report: 1 },
    },
    {
      new: true,
    })

 })

module.exports = {
   createPostController , 
   fetchPostController ,
   fetchSinglePostController,
   updatePostController,
   deletePostContoller , 
   toggleAddLikeToPostController,
   toggleAddDislikeToPostController,
   reportPostController
  };