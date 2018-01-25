var Users = require("../models/user");

module.exports = function(app, moment) {
  var listRoute = app.route("/user"),
    resultByIdRoute = app.route("/user/:id");

  listRoute.get(function(req, res) {
    Users.find({}, function(err, allUser) {
      var data = {
        allUsers: allUser,
        currentUser: req.user
      };

      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  resultByIdRoute
    .get(function(req, res) {
      Users.findById(req.params.id, function(err, user) {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
    })
    .put(function(req, res) {
      var editUser = {
        team: req.body.team,
        position: req.body.position,
        birthday: moment(req.body.birthday).format("YYYY-MM-DD"),
        age: req.body.birthday
      };

      Users.findByIdAndUpdate(req.params.id, editUser, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/user");
        }
      });
    })
    .delete(function(req, res) {
      Users.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            massage: req.params.id + "가 삭제되었습니다."
          });
          res.redirect("/user");
        }
      });
    });
};
