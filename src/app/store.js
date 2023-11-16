import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/auth/authSlice";
import postReducer from "../components/home/postSlice";
import commentReducer from "../components/home/commentSlice";

export default configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer,
        comment:commentReducer
       
    }
})

