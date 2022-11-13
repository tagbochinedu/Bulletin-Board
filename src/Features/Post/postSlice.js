import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say Slice, the more I want pizza",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd(state, action) {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const {postAdd} = postSlice.actions 

export default postSlice.reducer;
