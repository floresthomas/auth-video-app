import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { videoSlice } from "./slices/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
  },
});
