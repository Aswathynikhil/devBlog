import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";
import axiosInstance from "../../../utils/api_instance";

// Redirect Action
const resetUserAction = createAction("user/profile/reset");
const resetPasswordAction = createAction("password/reset");
//register action

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axiosInstance.post(
        `/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    console.log(" userData", userData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axiosInstance.post(
        `/api/users/login`,
        userData,
        config
      );
      //save user into local storage
      console.log(data, "fgfhhhhhhhhhhhhhh");
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user profile action
export const userProfileAction = createAsyncThunk(
  "users/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axiosInstance.get(
        `/api/users/profile/${id}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user follow action
export const userFollowAction = createAsyncThunk(
  "users/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axiosInstance.put(
        `/api/users/follow`,
        { followId: userToFollowId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// unFollow
export const userUnfollowAction = createAsyncThunk(
  "user/unfollow",
  async (unFollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axiosInstance.put(
        `/api/users/unfollow`,
        { unFollowId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//profile update action

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call

      const data = await axiosInstance.put(
        `/api/users`,
        {
          firstname: userData?.firstname,
          lastname: userData?.lastname,
          email: userData?.email,
          bio: userData?.bio,
        },
        config
      );

      //dispatch

      dispatch(resetUserAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);






//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
  "user/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`/api/users/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch al users

export const fetchAllUsersAction = createAsyncThunk(
  "user/usersList",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.get(`/api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Block User
export const blockUserAction = createAsyncThunk(
  "users/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axiosInstance.put(
        `/api/users/block-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Unblock User
export const unBlockUserAction = createAsyncThunk(
  "users/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axiosInstance.put(
        `/api/users/unblock-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update password
export const updatePasswordAction = createAsyncThunk(
  "password/update",
  async (password, { rejectWithValue, getState, dispatch }) => {
    //get  user token
    const user = getState()?.users;
    const { userAuth } = user;

    //http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    //http call
    try {
      const { data } = await axiosInstance.put(
        `/api/users/update_password`,
        {
          password,
        },
        config
      );
      //dispatch
      dispatch(resetPasswordAction());
      return data;
    } catch (error) {
      if (!error && !error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//password reset token generator

export const passwordResetTokenAction = createAsyncThunk(
  "password/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/users/forgetpasswordtoken`,
        { email },
        config
      );

      return data;
    } catch (error) {
      if (!error && !error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Password reset
export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axiosInstance.put(
        `/api/users/resetpassword`,
        { password: user?.password, token: user?.token },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//logout action

export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//upload profile photo

export const uploadProfilePhotoAction = createAsyncThunk(
  "user/profile-photo",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const formData = new FormData();
      formData.append("image", userImg?.image);
      const { data } = await axiosInstance.put(
        `/api/users/profilephoto-upload`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//upload cover photo

export const uploadCoverPhotoAction = createAsyncThunk(
  "user/cover-photo",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const formData = new FormData();
      formData.append("image", userImg?.image);
      const { data } = await axiosInstance.put(
        `/api/users/coverphoto-upload`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//--------------slices-----------

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //--------------profile--------------
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerError = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action?.payload;
      state.profileAppErr = undefined;
      state.profileServerError = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profileAppErr = action?.payload?.message;
      state.profileServerError = action?.error?.message;
    });

    //--------------upload profile photo --------------
    builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profilePhoto = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });


     //--------------upload cover photo --------------
     builder.addCase(uploadCoverPhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadCoverPhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coverPhoto = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadCoverPhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

     

    //update profile
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //fetch user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // fetch All user
    builder.addCase(fetchAllUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //block - user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //unblock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unBlock = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //logout

    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
      // state.appErr=undefined
      // state.serverError=undefined
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
      state.loading = false;
    });

    //follow user
    builder.addCase(userFollowAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(userFollowAction.fulfilled, (state, action) => {
      state.loading = false;
      state.followed = action?.payload;
      state.unFollowed = undefined;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(userFollowAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.unFollowed = undefined;
      state.serverError = action?.error?.message;
    });

    //user unFollow
    builder.addCase(userUnfollowAction.pending, (state, action) => {
      state.unfollowLoading = true;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(userUnfollowAction.fulfilled, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowed = action?.payload;
      state.followed = undefined;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(userUnfollowAction.rejected, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowedAppErr = action?.payload?.message;
      state.unfollowServerErr = action?.error?.message;
    });

    //update user password
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPasswordAction, (state, action) => {
      state.isPasswordUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordUpdated = action?.payload;
      state.isPasswordUpdated = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //password reset token generator
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default userSlices.reducer;
