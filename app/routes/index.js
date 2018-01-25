module.exports = function(app, passport) {
  // show the home page (will also have our login links)
  app.get("/", function(req, res) {
    var data = {
      message: "index",
      user: req.user
    };

    res.send(data);
  });
};
