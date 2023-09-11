const User = require("../models/User");
const Videos = require("../models/Videos");

async function getAllVideos(req, res) {
  try {
    const allVideos = await Videos.find();
    res.json(allVideos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function upload(req, res) {
  const { title, description, url, user } = req.body;
  try {
    if (!title || !description || !url || !user)
      return res.status(400).json({ message: "Faltan datos" });

    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const newVideo = new Videos({
      title,
      description,
      url,
      user,
      username: existingUser.username,
    });

    const videoSaved = await newVideo.save();
    res.json({
      title: videoSaved.title,
      description: videoSaved.description,
      url: videoSaved.url,
      user: videoSaved.user,
      username: videoSaved.username,
    });

    existingUser.videos.push(videoSaved._id);
    await existingUser.save();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getVideoById(req, res) {
  const { id } = req.params;

  try {
    const findVideo = await Videos.findById(id);
    res.json({
      title: findVideo.title,
      description: findVideo.description,
      url: findVideo.url,
      uploadDate: findVideo.uploadDate,
      user: findVideo.user,
      username: findVideo.username,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteVideoById(req, res) {
  const { id } = req.user;
  const videoId = req.params.id;

  try {
    await User.findByIdAndUpdate(id, {
      $pull: { videos: videoId },
    });

    res.json({ msg: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateVideoById(req, res) {
  const { id } = req.params;
  try {
    await Videos.updateOne({ _id: id }, req.body);
    const updateVideo = await Videos.findById(id);
    if (!updateVideo)
      return res.status(400).json({ msg: "Video no encontrado" });

    res.json({ msg: "Video actualizado", updateVideo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function likeVideos(req, res) {
  const { id } = req.user;
  const videoId = req.params.id;

  try {
    await User.findByIdAndUpdate(id, {
      $addToSet: { liked_videos: videoId },
    });

    res.json({ msg: "Video liked successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function removeLikeFromVideo(req, res) {
  const { id } = req.user;
  const videoId = req.params.id;

  try {
    await User.findByIdAndUpdate(id, {
      $pull: { liked_videos: videoId },
    });

    res.json({ msg: "Video unliked successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function likedVideos(req, res) {
  const { id } = req.user;

  try {
    const user = await User.findById(id).populate("liked_videos");

    res.json({ liked_videos: user.liked_videos });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  getAllVideos,
  upload,
  getVideoById,
  deleteVideoById,
  updateVideoById,
  likeVideos,
  likedVideos,
  removeLikeFromVideo
};
