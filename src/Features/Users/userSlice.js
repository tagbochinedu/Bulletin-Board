import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Chinedu" },
  { id: "1", name: "John" },
  { id: "2", name: "Tagbo" },
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser() {},
  },
});

export const selectAllUsers = (state) => state.users
export const { addUser } = userSlice.actions;
export default userSlice.reducer
