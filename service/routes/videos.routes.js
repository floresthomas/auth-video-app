const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");
const authRequired = require("../middlewares/validateToken");

router.get("/", authRequired ,videoController.getAllVideos)
router.get("/liked", authRequired ,videoController.likedVideos)
router.get("/:id", authRequired ,videoController.getVideoById)
router.post("/upload", authRequired ,videoController.upload)
router.delete("/:id", authRequired ,videoController.deleteVideoById)
router.put("/:id", authRequired ,videoController.updateVideoById)
router.put("/like/:id", authRequired ,videoController.likeVideos)

module.exports = router;