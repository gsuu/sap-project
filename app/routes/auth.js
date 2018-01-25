var middleware = require("../middleware");

module.exports = function(app, passport) {
  var logoutRoute = app.route("/logout"),
    loginRoute = app.route("/login"),
    signupRoute = app.route("/signup"),
    connectLocalRoute = app.route("/connect/local"),
    unlinkLocalRoute = app.route("/unlink/local");

  logoutRoute.get(function(req, res) {
    res.send({
      message: "Success Logout"
    });
    req.logout();
    res.redirect("/");
  });

  loginRoute
    .get(function(req, res) {
      res.send({
        message: "login page"
      });
    })
    .post(
      passport.authenticate("local-login", {
        successRedirect: "/expense",
        failureRedirect: "/login",
        failureFlash: true
      })
    );

  signupRoute
    .get(function(req, res) {
      res.send({
        message: "signup page"
      });
    })
    .post(
      passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/signup",
        failureFlash: true
      })
    );

  connectLocalRoute
    .get(function(req, res) {
      res.send({
        message: req.flash("loginMessage")
      });
    })
    .post(
      passport.authenticate("local-signup", {
        successRedirect: "/", // redirect to the secure profile section
        failureRedirect: "/connect/local", // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
      })
    );

  unlinkLocalRoute.get(middleware.isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect("/");
    });
  });
};
