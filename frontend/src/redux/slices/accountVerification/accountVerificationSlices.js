import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
//import axiosInstance from "../../../utils/api_instance";
import { baseUrl } from "../../../utils/baseURL";
import axiosInstance from "../../../utils/api_instance";


//action for redirect
const resetAccount = createAction("account/verify-reset");

//create token

export const accountVerificationSendTokenAction = createAsyncThunk(
    "account/token",
    async (token, { rejectWithValue, getState, dispatch }) => {
      //get  user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
  
      //http call
  
      try {
        const { data } = await axiosInstance.post(
          `/api/users/verify-mail-token`,
          {token},
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


//Verify Account
export const verifyAccountAction = createAsyncThunk(
    "account/verify",
    async (token, { rejectWithValue, getState, dispatch }) => {
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
          `/api/users/verify-account`,
          { token },
          config
        );
        //dispatch
        dispatch(resetAccount());
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//slices

const accountVerificationSlices = createSlice({
    name: "account",
    initialState: {},
    extraReducers: builder => {
      //create
      builder.addCase(accountVerificationSendTokenAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(accountVerificationSendTokenAction.fulfilled, (state, action) => {
        state.token = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(accountVerificationSendTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    //Verify account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(resetAccount, (state, action) => {
        state.isVerified = true;
      });
      builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
        state.verified = action?.payload;
        state.loading = false;
        state.isVerified = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(verifyAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    },
  });
  
  export default accountVerificationSlices.reducer;