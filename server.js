// server.js
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");

// express middleware
var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");

// etc packages
var moment = require("moment");

// config
var configDB = require("./config/database.js");
var port = process.env.PORT || 8080;

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// required for passport
app.use(
  session({
    secret: "ilovescotchscotchyscotchscotch", // session secret
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./app/routes/index.js")(app, passport);
require("./app/routes/auth.js")(app, passport);
require("./app/routes/user.js")(app, moment);
require("./app/routes/expense.js")(app, moment);
require("./app/routes/approval.js")(app, moment);

// launch ======================================================================
app.listen(port);
console.log("The magic happens on port " + port);
