const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authRequired(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid Token" });

    req.user = decoded;
  });
  next();
}

module.exports = authRequired;
