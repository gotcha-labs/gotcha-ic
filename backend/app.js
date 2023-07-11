require("dotenv").config();
const { dbConnect } = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");

var express = require("express");
const router = express.Router();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
const globleErrorHandler = require("./middlewares/globalErrorHandler");

var { getJwtStrategy } = require("./config/passport");

var indexRouter = require("./routes/index");

var app = express();

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.static("public"));
app.use("/public/uploads", express.static("public/uploads"));

passport.use(getJwtStrategy());

app.use(fileUpload());
router.get("/", (req, res) => {
  res.send("Welcome To Backend");
});

app.use("/api/v1", indexRouter(router));
app.use(globleErrorHandler);

dbConnect();

module.exports = app;
