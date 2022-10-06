import { createAsyncThunk, createSlice ,createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";


//redirect
const resetPost = createAction("post/reset");
const resetPostEdit = createAction("post/update");
const resetPostDelete = createAction("post/delete");

//-----------create post action--------------


export const createPostAction = createAsyncThunk('post/create',async(
    post,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config ={
        headers: {
            Authorization:`Bearer ${userAuth?.token}`,
        }
    };
    try {
        // http call
        const formData = new FormData();
        formData.append('title',post?.title);
        formData.append('description',post?.description);
        formData.append('category',post?.category);
        formData.append('image',post?.image);

        const { data } = await axios.post(`${baseUrl}/api/posts`,formData,config)
        //dispatch data
            dispatch(resetPost())
        return data;
    } catch (error) {
       if(!error?.response)throw error;
       return rejectWithValue(error?.response?.data); 
    }
    }) 



//-----------update post action--------------




export const updatePostAction = createAsyncThunk('post/update',async(
    post,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config ={
        headers: {
            Authorization:`Bearer ${userAuth?.token}`,
        }
    };
    try {
        // http call
     
        const { data } = await axios.put(`${baseUrl}/api/posts/${post?.id}`,post,config)
        //dispatch data
           dispatch(resetPostEdit())
        return data;
    } catch (error) {
       if(!error?.response)throw error;
       return rejectWithValue(error?.response?.data); 
    }
    }) 


   //-----------------Delete post action----------------

   export const deletePostAction = createAsyncThunk('post/delete',async(
    postId,{rejectWithValue,getState,dispatch})=>{
         //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config ={
        headers: {
            Authorization:`Bearer ${userAuth?.token}`,
        }
    };
    try {
        // http call
     
        const { data } = await axios.delete(`${baseUrl}/api/posts/${postId}`, config)
        //dispatch data
           dispatch(resetPostDelete())
        return data;
    } catch (error) {
       if(!error?.response)throw error;
       return rejectWithValue(error?.response?.data); 
    }
   })


    //------------------fetch all post actions ------------------------


    export const fetchAllPostAction = createAsyncThunk('post/fetchAllPost',async(
        category,{rejectWithValue,getState,dispatch})=>{
      
        try {
            const { data } = await axios.get(`${baseUrl}/api/posts?category=${category}`) 
            return data;
        } catch (error) {
           if(!error?.response)throw error;
           return rejectWithValue(error?.response?.data); 
        }
        }) 
    
    
     //--------------fetch a single post details-----------------------

   export const fetchSinglePostDetailsAction = createAsyncThunk("post/postDetails",
   async(postId,{rejectWithValue,getState,dispatch})=>{
     try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${postId}`) 
      return data;
     } catch (error) {
      if(!error?.response)throw error;
      return rejectWithValue(error?.response?.data); 
     }
   })
        
  //Add Likes to post

export const toggleAddLikesToPostAction = createAsyncThunk(
    "post/like",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.put(
          `http://localhost:3000/api/posts/likes`,
          { postId },
          config
        );
  
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );


    
  //Add disLikes to post

export const toggleAddDislikesToPostAction = createAsyncThunk(
    "post/dislike",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.put(
          `http://localhost:3000/api/posts/dislikes`,
          { postId },
          config
        );
  
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );



    //------------slices-------

    const postSlice =createSlice({
          name:"post",
          initialState:{},
          extraReducers:(builder)=>{
            //----create post-------
            builder.addCase(createPostAction.pending, (state,action)=>{
                state.loading = true;
            })
            builder.addCase(resetPost,(state,action)=>{
                state.isCreated=true
            });
            builder.addCase(createPostAction.fulfilled, (state,action)=>{
                state.postCreated =action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
                state.isCreated =false;
            })
            builder.addCase(createPostAction.rejected, (state,action)=>{
                state.loading = false;
                state.appErr= action?.payload?.message;
                state.serverErr=action?.error?.message;
            })


            //----update post-------
            builder.addCase(updatePostAction.pending, (state,action)=>{
              state.loading = true;
          })
          builder.addCase(resetPostEdit,(state,action)=>{
              state.isUpdated=true;
          });
          builder.addCase(updatePostAction.fulfilled, (state,action)=>{
              state.postUpdated =action?.payload;
              state.loading = false;
              state.appErr = undefined;
              state.serverErr = undefined;
              state.isCreated =false;
              state.isUpdated=false;
          })
          builder.addCase(updatePostAction.rejected, (state,action)=>{
              state.loading = false;
              state.appErr= action?.payload?.message;
              state.serverErr=action?.error?.message;
          })


             //----delete post-------
             builder.addCase(deletePostAction.pending, (state,action)=>{
              state.loading = true;
          })
          builder.addCase(resetPostDelete,(state,action)=>{
              state.isDeleted=true;
          });
          builder.addCase(deletePostAction.fulfilled, (state,action)=>{
              state.postDeleted =action?.payload;
              state.loading = false;
              state.appErr = undefined;
              state.serverErr = undefined;
              state.isCreated =false;
              state.isDeleted=false;
          })
          builder.addCase(deletePostAction.rejected, (state,action)=>{
              state.loading = false;
              state.appErr= action?.payload?.message;
              state.serverErr=action?.error?.message;
          })



          //---------fetch all posts

          builder.addCase(fetchAllPostAction.pending, (state,action)=>{
            state.loading = true;
        })
      
        builder.addCase(fetchAllPostAction.fulfilled, (state,action)=>{
            state.postLists =action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchAllPostAction.rejected, (state,action)=>{
            state.loading = false;
            state.appErr= action?.payload?.message;
            state.serverErr=action?.error?.message;
        })




         
          //---------fetch single post details

          builder.addCase(fetchSinglePostDetailsAction.pending, (state,action)=>{
            state.loading = true;
        })
      
        builder.addCase(fetchSinglePostDetailsAction.fulfilled, (state,action)=>{
            state.postDetails =action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchSinglePostDetailsAction.rejected, (state,action)=>{
            state.loading = false;
            state.appErr= action?.payload?.message;
            state.serverErr=action?.error?.message;
        })


        //--------------post likes

         
        builder.addCase(toggleAddLikesToPostAction.pending, (state,action)=>{
            state.loading = true;
        })
      
        builder.addCase(toggleAddLikesToPostAction.fulfilled, (state,action)=>{
            state.likes =action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(toggleAddLikesToPostAction.rejected, (state,action)=>{
            state.loading = false;
            state.appErr= action?.payload?.message;
            state.serverErr=action?.error?.message;
        })

        //--------------post dislikes

         
        builder.addCase(toggleAddDislikesToPostAction.pending, (state,action)=>{
            state.loading = true;
        })
      
        builder.addCase(toggleAddDislikesToPostAction.fulfilled, (state,action)=>{
            state.dislikes =action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(toggleAddDislikesToPostAction.rejected, (state,action)=>{
            state.loading = false;
            state.appErr= action?.payload?.message;
            state.serverErr=action?.error?.message;
        })

          }
    })
     export default postSlice.reducer;