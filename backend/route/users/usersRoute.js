const express = require('express');
const { userRegisterController ,
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
     coverPhotoUploadController
     
    } = require('../../controllers/users/userController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const {photoUpload, profilePhotoResize, coverPhotoResize} = require("../../middlewares/uploads/photoUpload");
const userRoutes = express.Router();

userRoutes.post('/register',userRegisterController)
userRoutes.post('/login',userLoginController)
userRoutes.get('/',fetchUsersController)

userRoutes.put('/follow',authMiddleware,followingUserController)
userRoutes.put('/unfollow',authMiddleware,unFollowUserController)
// userRoutes.put('/profile-photo',authMiddleware,profilePhotoUpload,profilePhotoUploadController)
userRoutes.put("/profilephoto-upload",authMiddleware,photoUpload.single("image"),profilePhotoResize, profilePhotoUploadController );
userRoutes.put("/coverphoto-upload",authMiddleware,photoUpload.single("image"),coverPhotoResize, coverPhotoUploadController );

userRoutes.put('/update_password/',authMiddleware,updatePasswordController)
userRoutes.post('/forgetpasswordtoken',forgetPasswordToken)
userRoutes.put('/resetpassword',passwordReset)

userRoutes.post("/verify-mail-token",authMiddleware,generateVerificationToken);
userRoutes.put("/verify-account",authMiddleware,accountVerification);

userRoutes.put('/block-user/:id',authMiddleware,blockUserController)
userRoutes.put('/unblock-user/:id',authMiddleware,unBlockUserController)

userRoutes.get('/profile/:id',authMiddleware,userProfileController)
// userRoutes.put('/:id',authMiddleware,updateProfileController)
userRoutes.put('/',authMiddleware,updateProfileController)

userRoutes.delete('/:id',deleteUserController)
userRoutes.get('/:id',fetchUserDetailsController)
module.exports = userRoutes;