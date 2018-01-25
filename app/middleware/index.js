var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next();

  req.flash("error","You need to Logged In to that");
};

module.exports = middlewareObj;
