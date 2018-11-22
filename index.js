var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// auth0
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();
// Import Mongoose
var mongoose = require("mongoose");
// Connect to Mongoose and set connection variable

/*** AUTH0 SECURITY */
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://lanteri.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "OCXxnvH4YMziUnwnOGXvLzzuID3fNGn5",
  issuer: `https://lanteri.eu.auth0.com/`,
  algorithms: ["RS256"]
});

/***** */

console.log(
  process.env.USER +
    ":" +
    process.env.PASSWORD +
    process.env.URI +
    process.env.DATABASE
);

// mongoose.connect(
//   "mongodb://" +
//     process.env.USER +
//     ":" +
//     process.env.PASSWORD +
//     process.env.URI +
//     process.env.DATABASE,
//   { useNewUrlParser: true }
// );
mongoose.connect(
  "mongodb://resume:Digital500gb@ds235302.mlab.com:35302/resume",
  { useNewUrlParser: true }
);
// handling with db errors
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to db!");
});

//
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

// cors
var whitelist = [
  "https://cv.lanteri.fr",
  "http://localhost:1234",
  "http://localhost:3000",
  "https://stephane.lanteri.fr"
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// routes
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/admin", cors(corsOptions), checkJwt, experiencesRouter);
app.use("/", cors(corsOptions), experiencesRouter);

module.exports = app;
