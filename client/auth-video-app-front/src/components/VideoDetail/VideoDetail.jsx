import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { videosById } from "../../store/getSlices/videoGetSlice";
import { FcLike, FcDislike } from "react-icons/fc";
import { giveLikeVideo } from "../../store/getSlices/authGetSlice";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";

export const VideoDetail = () => {
  const { videoid } = useParams();
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.video?.videoDetail);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch(videosById(videoid));
  }, [videoid]);

  const handleLike = (id) => {
    dispatch(giveLikeVideo(id));
    setLiked(true);
    toast.success("Video liked", {
      duration: 3000,
      position: "top-center",
      icon: "👏",
      style: {
        borderRadius: "8px",
        background: "#fff",
        color: "#000000",
        marginTop: "42px",
      },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-screen-md p-4 border rounded-lg shadow-lg bg-white">
        <ReactPlayer
          url={detail.url}
          className="w-full mb-4"
          width="100%"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {detail.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Video subido por: <span className="font-bold">{detail.username}</span>
        </p>
        <p className="text-gray-800 dark:text-gray-200 mb-8">
          {detail.description}
        </p>
        {liked === false ? (
          <button
            onClick={() => handleLike(videoid)}
            disabled={liked}
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            <FcLike className="mr-2" />
            Me gusta
          </button>
        ) : (
          <button
            disabled={liked}
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            <FcDislike className="mr-2" />
            Me gusta
          </button>
        )}
        <Toaster />
      </div>
    </div>
  );
};
