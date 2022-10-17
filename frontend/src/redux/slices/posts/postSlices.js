import { createAsyncThunk, createSlice ,createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";
import axiosInstance from "../../../utils/api_instance";


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

        const { data } = await axiosInstance.post(`/api/posts`,formData,config)
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
     
        const { data } = await axiosInstance.put(`/api/posts/${post?.id}`,post,config)
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
     
        const { data } = await axiosInstance.delete(`/api/posts/${postId}`, config)
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
            const { data } = await axiosInstance.get(`/api/posts?category=${category}`) 
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
      const { data } = await axiosInstance.get(`/api/posts/${postId}`) 
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
        const { data } = await axiosInstance.put(
          `/api/posts/likes`,
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
        const { data } = await axiosInstance.put(
          `/api/posts/dislikes`,
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

  //---save posts-------------
   export const savedPostAction = createAsyncThunk(
    "/posts/save", async(id,{ rejectWithValue, getState, dispatch})=>{
            //get user token
            const user = getState()?.users;
            const { userAuth } = user;
            console.log(userAuth,"ghjkl");
            const config = {
              headers: {
                Authorization: `Bearer ${userAuth?.token}`,
              },
            };
      try {
        const { data } = await axiosInstance.post('/api/posts/save',{id},config)
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
   )

   //-------saved posts list------------

   export const fetchSavedPostAction = createAsyncThunk(
     "/posts/saved-lists", async(id,{ rejectWithValue, getState, dispatch})=>{
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        console.log(userAuth,"ghjkl");
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        };
      try {
        const {data} =await axiosInstance.get('/api/posts/saved-list',config)
        console.log(data,"data");
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
     }
   )

    //---------delete a saved post---------
    export const deleteSavedPostAction = createAsyncThunk(
      "/posts/delete-postSaved", async(id,{ rejectWithValue, getState, dispatch})=>{
          //get user token
          const user = getState()?.users;
          const { userAuth } = user;
          console.log(userAuth,"ghjkl");
          const config = {
            headers: {
              Authorization: `Bearer ${userAuth?.token}`,
            },
          };
        try {
          const {data} =await axiosInstance.delete(`/api/posts/saved/${id}`,config);
          return data;
        } catch (error) {
          if (!error?.response) throw error;
          return rejectWithValue(error?.response?.data);
        }
      }
    )


    //Report a post

export const reportPostAction = createAsyncThunk(
  "post/report",
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
      const { data } = await axiosInstance.post(
        `/api/posts/report-post`,
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

 //-------reported posts list------------

 export const fetchReportedPostAction = createAsyncThunk(
  "/posts/reported-list", async(id,{ rejectWithValue,getState,dispatch})=>{
  
   try {
     const {data} =await axiosInstance.get('/api/posts/reported-list')
     console.log(data,"data");
     return data;
   } catch (error) {
     if (!error?.response) throw error;
     return rejectWithValue(error?.response?.data);
   }
  }
)

//Block post
export const blockPostAction = createAsyncThunk(
  "post/block",
  async (postId, { rejectWithValue, getState, dispatch }) => {

    try {
      const { data } = await axiosInstance.post(
        `/api/posts/block-post`,
        {postId},
   
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//-----------------------------search a post ------------------------------

//search
export const searchPostAction = createAsyncThunk(
  "post/searchPost",
  async (query, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`/api/posts/search-post/?q=${query}`)
      return data;
    } catch (error) {
      if (!error?.response) throw error
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
      return rejectWithValue(message)
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

        //--------save post--------
        builder.addCase(savedPostAction.pending, (state,action)=>{
          state.loading = true;
      })
    
      builder.addCase(savedPostAction.fulfilled, (state,action)=>{
        state.saved = true
        state.deleted = false
        state.savedPost = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      builder.addCase(savedPostAction.rejected, (state,action)=>{
          state.loading = false;
          state.appErr= action?.payload?.message;
          state.serverErr=action?.error?.message;
      })

      //------fetch saved posts-------------------
      
      builder.addCase(fetchSavedPostAction.pending, (state,action)=>{
          state.loading = true;
      })
    
      builder.addCase(fetchSavedPostAction.fulfilled, (state,action)=>{
        console.log(action?.payload,"action");
        state.saved = true
        state.deleted = false
        state.savedList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      builder.addCase(fetchSavedPostAction.rejected, (state,action)=>{
          state.loading = false;
          state.appErr= action?.payload?.message;
          state.serverErr=action?.error?.message;
      })

      
         //------------delete a saved post------------

      builder.addCase(deleteSavedPostAction.pending, (state,action)=>{
        state.loading = true;
      })
    
      builder.addCase(deleteSavedPostAction.fulfilled, (state,action)=>{
        state.deleted = true
        state.saved = false
        state.deletedPost = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      builder.addCase(deleteSavedPostAction.rejected, (state,action)=>{
          state.loading = false;
          state.appErr= action?.payload?.message;
          state.serverErr=action?.error?.message;
      })

        //--------------post report

         
        builder.addCase(reportPostAction.pending, (state,action)=>{
          state.loading = true;
      })
    
      builder.addCase(reportPostAction.fulfilled, (state,action)=>{
          state.reports =action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
      })
      builder.addCase(reportPostAction.rejected, (state,action)=>{
          state.loading = false;
          state.appErr= action?.payload?.message;
          state.serverErr=action?.error?.message;
      })


            //------fetch reported posts-------------------
      
          builder.addCase(fetchReportedPostAction.pending, (state,action)=>{
              state.loading = true;
          })
        
          builder.addCase(fetchReportedPostAction.fulfilled, (state,action)=>{
            console.log(action?.payload,"action");
            state.reported = true
            state.reportedList = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
          })
          builder.addCase(fetchReportedPostAction.rejected, (state,action)=>{
              state.loading = false;
              state.appErr= action?.payload?.message;
              state.serverErr=action?.error?.message;
          })
            //block - post
    builder.addCase(blockPostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.blockPost = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //search post 
    builder.addCase(searchPostAction.pending, (state, action) => {
      state.searchLoading = true;
    });
    builder.addCase(searchPostAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.searchLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(searchPostAction.rejected, (state, action) => {
      state.searchLoading = false;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });
          }
    })
     export default postSlice.reducer;