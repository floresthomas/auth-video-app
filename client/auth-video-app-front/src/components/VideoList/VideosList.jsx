import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allVideos } from "../../store/getSlices/videoGetSlice";
import { VideoCard } from "../VideoCard/VideoCard";

export const VideosList = () => {
  const dispatch = useDispatch();
  const stateVideos = useSelector((state) => state.video?.videos);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (userToken) {
      dispatch(allVideos());
    }
  }, [userToken]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl mt-2">Bienvenidos a VideoApp</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stateVideos.length > 0
            ? stateVideos?.map((video) => {
                return (
                  <VideoCard
                    id={video._id}
                    key={video._id}
                    title={video.title}
                    description={video.description}
                    url={video.url}
                    user={video.user}
                    username={video.username}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};
