import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
  posts: [], status: 'idle', error:null
}
//This is a method which accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      //In the event that the action.payload has to be the mutated a bit, the prepare() callback is used to make additions or remove things from it.
      prepare(body) {
        return {
          payload: {
            id: nanoid(),
            title: body.title,
            content: body.content,
            date: new Date().toISOString(),
            userId: body.userId,
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
//the createSlice creates an action creator function which returns an action. An action is an object which contains type and payload keys
export const { postAdd, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
