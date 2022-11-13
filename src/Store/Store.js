import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Features/Post/postSlice";

export const store = configureStore({ reducer: { posts: postReducer } });
