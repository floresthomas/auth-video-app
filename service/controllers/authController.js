const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt");

//register
async function register(req, res) {
  const { email, password, username } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound) return res.status(400).json({ msg: "Email already exists" });

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long" });
  }
  try {
    if (!userFound) {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password: passwordHash,
      });

      const userSaved = await newUser.save();
      const token = await createAccessToken({ id: userSaved._id });
      res.cookie("token", token);
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

//login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ msg: "Password incorrect" });

    if (userFound && isMatch) {
      const token = await createAccessToken({ id: userFound._id });
      
      res.cookie("token", token);      
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        videos: userFound.videos,
        likes: userFound.liked_videos,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

//logout
function logout(req, res) {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}

//profile
async function profile(req, res) {
  const { id } = req.user

  const userFound = await User.findById(id);

  const userWithVideos = await User.findById(userFound).populate("videos");
  const likedVideos = await User.findById(userFound).populate("liked_videos");

  if (!userWithVideos || !likedVideos) {
    return res.status(400).json({ msg: "User not found" });
  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    videos: userWithVideos.videos,
    likes: likedVideos.liked_videos,
  });
}

module.exports = { register, login, logout, profile };
