import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./foldersSlice";

export default configureStore({
  reducer: {
    folders: foldersReducer
  }
})

