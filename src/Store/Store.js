import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Features/Post/postSlice";
import userReducer from "../Features/Users/userSlice";

//The postReducer is basically a slice(which is an object) containing a state and a bunch of actions which can alter it
//the 'post:' is the name assigned to it within the store
//The reducer is basically an object of all the slices which will be combined by the configureStore to create a rootReducer for the entire site. Basically converting those multiple slices into one the way we have in useReducer. It can also be a single function and if it is, the configureStore uses it directly as the root reducer
//The configureStore basically creates the global state for the project by creating the rootReducer and adding middleware(I don't yet know what that is but I will find out) if yu provide it.
export const store = configureStore({
  reducer: { posts: postReducer, users: userReducer },
});
