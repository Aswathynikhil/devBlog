import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/users/userSlices";
import categoryReducer from "../slices/category/categorySlices";
import postReducer from "../slices/posts/postSlices";
import commentReducer from "../slices/comments/commentSlices";
import sendMail from "../slices/email/emailSlices";
import accountVerification from "../slices/accountVerification/accountVerificationSlices";
const store = configureStore({
    reducer: {
     users: userReducer,
     category: categoryReducer,
     post:postReducer,
     comment:commentReducer,
     sendMail,
     accountVerification
    },

})

export default store;