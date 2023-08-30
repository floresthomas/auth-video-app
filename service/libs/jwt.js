const jwt = require("jsonwebtoken");

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "secretKey", { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = {
  createAccessToken,
}