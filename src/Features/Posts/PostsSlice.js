import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //idle | loading | succeeded | failed
  error: null,
};

//createAsyncThunk is a middleware used for http requests because redux toolkit operates synchronously and so cannot handle asynchronous functions. Thus async thunk serves as a middleware for bridging that gap.It takes two arguments. the first is the prefix for the generated action type which is a string and the second is a callback which creates a payload
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log(response)
    return [...response.data];
    
  } catch (err) {
    return err.message;
  }
});

export const addPosts = createAsyncThunk("posts/addPosts", async (post) => {
  try {
    const response = await axios.post(POSTS_URL, post);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      //the prepare callback is simply a way to 'prepare' the payload before it is used to update the state. So once it is set, it will run before the reducer function that was set to update the state
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  }, //extraReducers serves as a way for the slice reducer to respond to other actions that weren't defined as part of it. it takes a builder parameter which allows it to create additional case reducers that run in response to actions defined outside of the slice
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action)=>{
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPosts.fulfilled, (state, action)=>{
        console.log(action.payload)
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        
        state.posts.push(action.payload)
        console.log(state.posts)
      })
  },
});

//the createSlice automatically creates an action creator function which returns an action. An action is an object which contains type and payload keys
export const { addPost, addReaction } = PostsSlice.actions;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectAllPosts = (state) => state.posts.posts;
export default PostsSlice.reducer;
