import {
  deleteVideoUser,
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  giveLikeSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  registerFailure,
  registerRequest,
  registerSuccess,
  removeLikeVideoSuccess,
} from "../slices/authSlice";
import axios from "axios";

export const registerAuth = (body) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", body);
      if (res.data) {
        dispatch(registerSuccess(res.data));
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      console.log(error.message);
    }
  };
};

export const loginAuth = (body) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const res = await axios.post("http://localhost:3000/auth/login", body);
      if (res.data) {
        dispatch(loginSuccess(res.data));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error.message);
    }
  };
};

export const logoutAuth = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/logout");
      dispatch(logout(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(getProfileRequest());
    try {
      const res = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      });
      dispatch(getProfileSuccess(res.data));
    } catch (error) {
      dispatch(getProfileFailure(error.message));
      console.log(error.message);
    }
  };
};
export const removeLikeFromVideo = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/videos/removelike/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res) {
        dispatch(removeLikeVideoSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserVideosById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/videos/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(deleteVideoUser(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const giveLikeVideo = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/videos/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(giveLikeSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
