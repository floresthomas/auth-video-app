import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  userToken: null,
  likes: [],
  videosCreated: [],
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      const userString = JSON.stringify(action.payload);
      localStorage.setItem("user", userString);
      state.userToken = action.payload.token;
      state.likes = action.payload.likes;
      state.videosCreated = action.payload.videos;
      localStorage.setItem("userToken", action.payload.token);
      state.success = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.loading = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      state.success = false;
    },
    registerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.videosCreated = action.payload.videos;
      state.likes = action.payload.likes;
    },
    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    giveLikeSuccess: (state, action) => {
      const videoToUpdate = state.videosCreated.find(
        (video) => video._id === action.payload._id
      );
      state.likes.push(videoToUpdate);
    },
    deleteVideoUser: (state, action) => {
      return {
        ...state,
        videosCreated: state.videos.filter((video) => video._id !== action.payload),
      };
    },
    removeLikeVideoSuccess: (state, action) => {
      return {
        ...state,
        videosCreated: state.videosCreated.filter(
          (video) => video._id !== action.payload
        ),
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  removeLikeVideoRequest,
  removeLikeVideoSuccess,
  giveLikeRequesst,
  giveLikeSuccess,
  deleteVideoUser,
} = authSlice.actions;
