import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  EditVideoPage,
  Home,
  LandingPage,
  Profile,
  VideoId,
  VideoUploadPage,
} from "./views";
import { Register } from "./components/Register/Register";

import { Provider } from "react-redux";
import { store } from "./store";
import { Navbar } from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { UploadVideo } from "./components/UploadVideo/UploadVideo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<Profile />} />
      </>
    ),
  },
  {
    path: "/video/:videoid",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<VideoId />} />
      </>
    ),
  },
  {
    path: "/uploadvideo",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<UploadVideo />} />
      </>
    ),
  },
  {
    path: "/editvideo/:id",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<EditVideoPage />} />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
