import {
  getLoading,
  getClearPage,
  getVideos,
  getVideoById,
  addVideos,
  deleteVideo,
  updateVideo,
} from "../slices/videoSlice";
import axios from "axios";

export const allVideos = () => {
  return async (dispatch) => {
    dispatch(getLoading());
    try {
      const res = await axios.get("http://localhost:3000/videos", {
        withCredentials: true,
      });
      if (res) {
        dispatch(getVideos(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const videosById = (id) => {
  return async (dispatch) => {
    dispatch(getLoading());
    try {
      const res = await axios.get(`http://localhost:3000/videos/${id}`, {
        withCredentials: true,
      });
      if (res) {
        dispatch(getVideoById(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createVideo = (body) => {
  return async (dispatch) => {
    dispatch(getLoading());
    try {
      const res = await axios.post(
        "http://localhost:3000/videos/upload",
        body,
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(addVideos(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteVideosById = (id) => {
  return async (dispatch) => {
    dispatch(getLoading());
    try {
      const res = await axios.delete(`http://localhost:3000/videos/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteVideo(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateVideosById = (id, body) => {
  return async (dispatch) => {
    dispatch(getLoading());
    try {
      const res = await axios.put(`http://localhost:3000/videos/${id}`, body, {
        withCredentials: true,
      });
      console.log(res);
      if (res) {
        dispatch(updateVideo(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClear = () => {
  return async (dispatch) => {
    dispatch(getClearPage());
  };
};
