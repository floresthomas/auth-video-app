import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  removeLikeFromVideo,
} from "../../store/getSlices/authGetSlice";
import { deleteVideosById } from "../../store/getSlices/videoGetSlice";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { getVideos } from "../../store/slices/videoSlice";

export const ViewProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  // const storedUser = localStorage.getItem("user");
  // const user = JSON.parse(storedUser);
  const [activeTab, setActiveTab] = useState("videosSubidos");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteById = async (id) => {
    dispatch(deleteVideosById(id));
    dispatch(fetchProfile());
  };

  const handleRemoveLike = async (id) => {
    dispatch(removeLikeFromVideo(id));
    dispatch(fetchProfile());
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="flex flex-col justify-start items-start">
        <h1 className="font-bold text-xl">Profile</h1>
        <span className="font-semibold">{user.email}</span>
        <span className="font-semibold">{user.username}</span>

        <div className="mt-3">
          <button
            onClick={() => handleTabClick("videosSubidos")}
            className={`mr-2 ${
              activeTab === "videosSubidos" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded`}
          >
            Videos Subidos
          </button>
          <button
            onClick={() => handleTabClick("likes")}
            className={`${
              activeTab === "likes" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded`}
          >
            Likes
          </button>
        </div>

        <div className="mt-5 ">
          {activeTab === "videosSubidos" && (
            <>
              <h1 className="font-bold text-xl">Videos Subidos</h1>
              <div className="grid grid-cols-4 gap-6 mt-2">
                {user?.videos
                  ? user?.videos.map((v, index) => {
                      return (
                        <div
                          key={index}
                          className="relative  w-full max-w-screen-md p-4 border rounded-lg shadow-lg bg-white "
                        >
                          <ReactPlayer
                            url={v.url}
                            className="react-player"
                            width="300px"
                            height="200px"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          <button
                            onClick={() => handleDeleteById(v._id)}
                            className="absolute top-0 right-0 p-2 bg-red-500 text-white"
                          >
                            <AiFillDelete />
                          </button>
                          <div className="flex justify-around items-center mt-2">
                            <Link to={`/video/${v._id}`}>Detail</Link>
                            <Link to={`/editvideo/${v._id}`}>Edit Video</Link>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </>
          )}

          {activeTab === "likes" && (
            <div>
              <h1 className="font-bold text-xl">Videos que te gustaron</h1>
              <div className="grid grid-cols-4 gap-6 mt-2 ">
                {user?.likes
                  ? user?.likes.map((v, index) => {
                      return (
                        <div
                          key={index}
                          className="relative  w-full max-w-screen-md p-4 border rounded-lg shadow-lg bg-white "
                        >
                          <ReactPlayer
                            url={v.url}
                            className="react-player"
                            width="300px"
                            height="200px"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          <button
                            onClick={() => handleRemoveLike(v._id)}
                            className="absolute top-0 right-0 p-2 bg-red-500 text-white"
                          >
                            <AiFillLike />
                          </button>
                          <div className="flex justify-around items-center mt-2">
                            <Link to={`/video/${v._id}`}>Detail</Link>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
