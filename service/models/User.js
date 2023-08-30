const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  liked_videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

module.exports = mongoose.model("User", userSchema);
