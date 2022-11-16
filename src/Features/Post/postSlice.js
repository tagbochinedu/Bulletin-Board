import { createSlice, nanoid } from "@reduxjs/toolkit";


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
//This is a method which accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer(state, action) {
        state.push(action.payload);
      },
      //In the event that the action.payload has to be the mutated a bit, the prepare() callback is used to make additions or remove things from it.
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(), title, content
          }
        }
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
//the createSlice creates an action creator function which returns an action. An action is an object which contains type and payload keys
export const { postAdd } = postSlice.actions;

export default postSlice.reducer;
