import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

//Redux is generally synchronous so to create asynchronous actions, we use createAsyncThunk. It takes two arguments, first being a string which serves as the prefix for the created action type. The second being a payload-creator-callback
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await fetch(POSTS_URL);
    const result = await response.json();
    return [...result];
  } catch (err) {
    return err.message;
  }
});
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
  },
  reactionAdded(state, action) {
    const { postId, reaction } = action.payload;
    const existingPost = state.posts.find((post) => post.id === postId);
    if (existingPost) {
      existingPost.reactions[reaction]++;
    }
  },
  //the extraReducers function handles actions not defined in the within the slice. It does this by accepting a builder parameter. This builder parameter takes on a method called addCase which helps to define different functions based on the different promise action types. Basically its a switch statement that accepts the promise
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state, action)
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString;
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
//the createSlice creates an action creator function which returns an action. An action is an object which contains type and payload keys
export const { postAdd, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
