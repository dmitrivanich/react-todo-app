import { createSlice } from "@reduxjs/toolkit";

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: []
  },
  reducers: {
    createFolder(state, action) {
      console.log(state, 'c')
      console.log(action, 'c')
    },
    removeFolder(state, action) {
      console.log(state, 'r')
      console.log(action, 'r')
    }
  },
});

export const { createFolder, removeFolder } = foldersSlice.actions;
export default foldersSlice.reducer;