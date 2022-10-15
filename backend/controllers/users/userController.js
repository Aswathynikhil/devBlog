const { response } = require("express");
const expressAsyncHandler = require("express-async-handler");
const crypto = require("crypto");
const fs = require("fs");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");
const { sendMailHelper } = require("../../utils/sendMailHelper");
const nodemailer = require("nodemailer");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const blockUser = require("../../utils/isBlock");

//register
const userRegisterController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");
  try {
    const user = await User.create({
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//login

const userLoginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  blockUser(userFound);

  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified: userFound?.isAccountVerified,
    });
  } else {
   // res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//fetch all users

const fetchUsersController = expressAsyncHandler(async (req, res) => {
  console.log(req.headers + "yttttttttttttt");
  try {
    const users = await User.find({}).populate("posts");
    res.json(users);
    console.log(users);
  } catch (error) {
    res.json(error);
  }
});

//delete user
const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//------------user details------------------
const fetchUserDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});
//--------------user profile----------------
const userProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  //1.find the login user
  //2.check this particular user if the login user exists in the array of viewedby
  //get the login user
  const loginUserId = req?.user?._id?.toString();
  console.log(loginUserId);
  try {
    const myProfile = await User.findById(id)
      .populate("posts")
      .populate("viewedBy")
      .populate("followers")
      .populate("following");
    const alreadyViewed = myProfile?.viewedBy?.find((user) => {
      return user?._id?.toString() === loginUserId;
    });
    if (alreadyViewed) {
      res.json(myProfile);
    } else {
      const profile = await User.findByIdAndUpdate(myProfile?._id, {
        $push: { viewedBy: loginUserId },
      });
      res.json(profile);
    }
  } catch (error) {
    res.json(error);
  }
});

//------------update profile-----------

const updateProfileController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  //check if user blocked
  blockUser(req.user);
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//--------------update pasword-------------
const updatePasswordController = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req?.user;
  const { password } = req?.body;
  validateMongodbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

//-----------------------following----------------------

const followingUserController = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;
  console.log({ followId, loginUserId });

  //Find the target user and  check if the login id is exist

  const targetUser = await User.findById(followId);
  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );
  if (alreadyFollowing) throw new Error("You have already followed this user");
  // console.log(alreadyFollowing);

  //FInd the user you want to follow and  update it's followers field

  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //updater the login user following field

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    {
      new: true,
    }
  );
  res.json("You have successfully follow this user.");
});

//------------unfollowing----------------

const unFollowUserController = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;
  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  );
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    {
      new: true,
    }
  );
  res.json("You have successfully unfollowed this user");
});

//-------------Block user---------------
const blockUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );
  res.json(user);
});

//-------------UnBlock user---------------
const unBlockUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );
  res.json(user);
});

// -------------Generate Email Verification Token-----------------

const generateVerificationToken = expressAsyncHandler(async (req, res) => {
  console.log("generateVerificationToken");
  const { to, from, subject, message, resetURL } = req.body;

  // Step 1
  // transporter is what going to connect you to whichever host domain that using or either services that you'd like to
  // connect
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);
  console.log(user);
  try {
    // Generate token
    const verificationToken = await user?.createAccountVerificationToken();
    // save user
    await user.save();
    //build your message
    const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify your account</a>`;
    let mailOptions = {
      from: "devblog.info2022@gmail.com",
      to: user?.email,
      // to: "devblog.info2022@gmail.com",
      subject: "devblog Verification",
      message: "verify your account now",
      html: resetURL,
    };
    // step 3
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        console.log("Email sent");
      }
    });
    res.json(resetURL);
  } catch (error) {
    res.json(error);
  }
});

//Account verification
const accountVerification = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error("Token expired, try again later");
  //update the proprt to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationExpires = undefined;
  await userFound.save();
  res.json(userFound);
});

//------------------------------
//Forget password token generator
//------------------------------

// const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
//   //find the user by email
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User Not Found");

//   try {
//     //Create token
//     const token = await user.createPasswordResetToken();
//     console.log(token);
//     await user.save();

//     //build your message
//     const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to Reset</a>`;
//     const msg = {
//       to: email,
//       from: "devblog.info2022@gmail.com",
//       subject: "Reset Password",
//       html: resetURL,
//     };

//     await sgMail.send(msg);
//     res.json({
//       msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// });

const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
  //find the user by email
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Found");

  try {
    //Create token
    const token = await user.createPasswordResetToken();
    console.log(token);
    // save user
    await user.save();
    //build your message
    const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to Reset</a>`;
    let mailOptions = {
      from: process.env.EMAIL,
      to: user?.email,
      // to: "devblog.info2022@gmail.com",
      subject: "Reset password",
      message: "Reset your password now",
      html: resetURL,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        console.log("Email sent");
      }
    });
    res.json(resetURL);
  } catch (error) {
    res.json({
      msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
    });
  }
});

//------------------------------
//Password reset
//------------------------------

const passwordReset = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, try again later");

  //Update/change the password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//----------profile photo upload----------

const profilePhotoUploadController = expressAsyncHandler(async (req, res) => {
  // find the login user
  // console.log(req.user);

  const { _id } = req?.user;

  //get the path to the image
  const localPath = `public/images/profile/${req.file.filename}`;
  // upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  // console.log(imgUploaded);
  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imgUploaded?.url,
    },
    { new: true }
  );

  //remove the saved image
  fs.unlinkSync(localPath);
  // res.json(foundUser);
  res.json(imgUploaded);
});

//----------cover photo upload----------

const coverPhotoUploadController = expressAsyncHandler(async (req, res) => {
  // find the login user
  // console.log(req.user);

  const { _id } = req?.user;

  //get the path to the image
  const localPath = `public/images/profile/${req.file.filename}`;
  // upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  // console.log(imgUploaded);
  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      coverPhoto: imgUploaded?.url,
    },
    { new: true }
  );

  //remove the saved image
  fs.unlinkSync(localPath);
  // res.json(foundUser);
  res.json(imgUploaded);
});


module.exports = {
  userRegisterController,
  userLoginController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateProfileController,
  updatePasswordController,
  followingUserController,
  unFollowUserController,
  blockUserController,
  unBlockUserController,
  generateVerificationToken,
  accountVerification,
  forgetPasswordToken,
  passwordReset,
  profilePhotoUploadController,
  coverPhotoUploadController,
};
