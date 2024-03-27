import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import fileSlice from "./slices/fileSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        file: fileSlice
    }
})
