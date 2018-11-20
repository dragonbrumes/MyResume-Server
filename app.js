var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
// Import Mongoose
let mongoose = require("mongoose");
var db = require("db.js");
// Connect to Mongoose and set connection variable
mongoose.connect(
  "mongodb://" +
    process.env.USER +
    ":" +
    process.env.PASSWORD +
    process.env.URI +
    process.env.DATABASE,
  { useNewUrlParser: true }
);
// var db = mongoose.connection;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var experiencesRouter = require("./routes/experiences");

var app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", experiencesRouter);

module.exports = app;
