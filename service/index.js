const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./connection.js");

const authRouter = require("./routes/auth.routes.js");
const videoRouter = require("./routes/videos.routes.js");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//routes
app.use("/auth", authRouter);
app.use("/videos", videoRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
