var Expense = require("../models/expense");

module.exports = function(app, moment) {
  var listRoute = app.route("/expense"),
    createRoute = app.route("/expense/create"),
    editRoute = app.route("/expense/:id/edit"),
    resultByIdRoute = app.route("/expense/:id");

  listRoute.get(function(req, res) {
    Expense.find({}, function(err, allExpense) {
      var data = {
        currentUser: req.user,
        expense: allExpense
      };

      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  createRoute.post(function(req, res) {
    var newExpense = {
      category: req.body.category,
      useDate: moment(req.body.useDate).format("YYYY-MM-DD HH:mm:ss"),
      usage: req.body.usage,
      description: req.body.description,
      approvalState: req.body.approvalState,
      price: req.body.price,
      writer: req.user,
      team: req.user
    };

    Expense.create(newExpense, function(err, newlyCreate) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/expense");
      }
    });
  });

  editRoute.get(function(req, res) {
    Expense.findById(req.params.id, function(err, foundExpense) {
      var data = {
        expense: foundExpense
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
      Expense.findById(req.params.id, function(err, expanse) {
        if (err) {
          res.send(err);
        } else {
          res.json(expanse);
        }
      });
    })
    .put(function(req, res) {
      var editExpense = {
        category: req.body.category,
        useDate: moment(req.body.useDate).format("YYYY-MM-DD HH:mm:ss"),
        usage: req.body.usage,
        description: req.body.description,
        approvalState: req.body.approvalState,
        price: req.body.price,
        writer: req.user,
        team: req.user
      };

      Expense.findByIdAndUpdate(req.params.id, editExpense, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/expense");
        }
      });
    })
    .delete(function(req, res) {
      Expense.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/expense");
        }
      });
    });
};
