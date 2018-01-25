var mongoose = require("mongoose");

var expenseSchema = mongoose.Schema({
  category: String,
  useDate: String,
  usage: String,
  description: String,
  price: Number,
  writer: String,
  team: String,
  approvalState: String,
});

module.exports = mongoose.model("Expense", expenseSchema);
