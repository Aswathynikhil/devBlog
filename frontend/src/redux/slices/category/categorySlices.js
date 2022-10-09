import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";
import axiosInstance from "../../../utils/api_instance";

//----------create category action---------------

export const createCategoryAction = createAsyncThunk("category/create",async(category,{rejectWithValue,getState,dispatch})=>{
//get user token

const user = getState()?.users;
const { userAuth } = user;
// console.log(userAuth?.token);
const config = {
  headers: {
    Authorization: `Bearer ${userAuth?.token}`,
  },
};
//http call
try {
    const { data}= await axiosInstance.post(`/api/category`,
    {
         title:category?.title,

    },
    config
    );
    return data;
} catch (error) {
    if(!error?.response){
        throw error;
    }
    return rejectWithValue(error?.response?.data)
}

}
);

//----------fetch all categories action---------------

export const fetchAllCategoriesAction = createAsyncThunk("category/fetchAllCategories",async(category,{rejectWithValue,getState,dispatch})=>{
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
        const { data}= await axiosInstance.get(`/api/category`,config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
    
    }
    );

    //----------fetch a single  category detail action---------------

export const fetchSingleCategoryDetailsAction = createAsyncThunk("category/fetchSingleCategory",async(id,{rejectWithValue,getState,dispatch})=>{
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
        const { data}= await axiosInstance.get(`/api/category/${id}`,config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
    
    }
    );




//----------update categories action---------------

export const updateCategoriesAction = createAsyncThunk("category/update",async(category,{rejectWithValue,getState,dispatch})=>{
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
        const { data}= await axiosInstance.put(`/api/category/${category?.id}`,
        {title:category?.title},
        config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
    
    }
    );


    //----------delete categories action---------------

export const deleteCategoriesAction = createAsyncThunk("category/delete",async(id,{rejectWithValue,getState,dispatch})=>{
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
        const { data}= await axiosInstance.delete(`/api/category/${id}`,config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
    
    }
    );
    

//----------slices----------------

const categorySlices = createSlice({
    name:"category",
    initialState:{},
    extraReducers:(builder)=>{
        // create category
        builder.addCase(createCategoryAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
            state.category = action?.payload;
            state.loading = false;
            state.isCreated = true;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(createCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message
        })

        //fetch all category
        builder.addCase(fetchAllCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(fetchAllCategoriesAction.fulfilled,(state,action)=>{
            state.categoryList= action?.payload;
            state.loading = false;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(fetchAllCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message  
        })

        //fetch single category details
        builder.addCase(fetchSingleCategoryDetailsAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(fetchSingleCategoryDetailsAction.fulfilled,(state,action)=>{
            state.categoryDetails= action?.payload;
            state.loading = false;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(fetchSingleCategoryDetailsAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message  
        })


         //update category
         builder.addCase(updateCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(updateCategoriesAction.fulfilled,(state,action)=>{
            state.updateCategory= action?.payload;
            state.loading = false;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(updateCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message  
        })


        //delete category
        builder.addCase(deleteCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(deleteCategoriesAction.fulfilled,(state,action)=>{
            state.deleteCategory= action?.payload;
            state.loading = false;
            state.isDeleted=true;
            state.appErr =undefined;
            state.serverErr =undefined;
        })
        builder.addCase(deleteCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message  
        })
    }
})

export default categorySlices.reducer;