import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const VideoCard = ({ title, description, url, username, id }) => {
  return (
    <div className="p-2">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ReactPlayer
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <Link to={`/video/${id}`}>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
            <p>{username}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
