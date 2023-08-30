const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authRequired = require("../middlewares/validateToken.js");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/profile", authRequired, authController.profile);

module.exports = router;
