const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("transactions", TransactionSchema)

