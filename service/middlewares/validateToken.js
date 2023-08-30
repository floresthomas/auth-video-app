const jwt = require("jsonwebtoken");

function authRequired(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid Token" });

    req.user = decoded;
  });
  next();
}

module.exports = authRequired;
