import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  videos: [],
  videoDetail: [],
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    getLoading: (state, action) => {
      state.loading = action.payload;
    },
    getClearPage: (state) => {
      return {
        ...state,
        videos: [],
      };
    },
    getVideos: (state, action) => {
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    },
    getVideoById: (state, action) => {
      return {
        ...state,
        loading: false,
        videoDetail: action.payload,
      };
    },
    addVideos: (state, action) => {
      return {
        ...state,
        videos: [...state.videos, action.payload],
      };
    },
    deleteVideo: (state, action) => {
      return {
        ...state,
        videos: state.videos.filter((video) => video._id !== action.payload),
      };
    },
    updateVideo: (state, action) => {
      return {
        ...state,
        videos: action.payload,
      };
    },
  },
});

export const {
  getLoading,
  getClearPage,
  getVideos,
  getVideoById,
  addVideos,
  deleteVideo,
  updateVideo,
  removeLike,
} = videoSlice.actions;
