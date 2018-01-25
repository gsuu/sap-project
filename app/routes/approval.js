var Expense = require("../models/expense");

module.exports = function(app, moment) {
  var listRoute = app.route("/approval/:team");

  listRoute.get(function(req, res) {
    Expense.find({ team: req.params.team, approvalState: "ready" }, function(
      err,
      expense
    ) {
      if (err) {
        res.send(err);
      } else {
        res.send(expense);
      }
    });
  });
};
