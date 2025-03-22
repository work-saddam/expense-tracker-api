const Transaction = require("../models/expense");
const mongoose = require("mongoose");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.find();
    // res.json(expenses);
    res.render("expenses", { expenses });  //1st parameter:- views file name, 2nd:-Passing variable
    
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid Expense ID" });
    }
    const expense = await Transaction.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount) {
      return res.status(400).json({ massage: "All field are required" });
    }
    const addExpense = new Transaction({ name, amount });
    await addExpense.save();
    // const addExpense = await Transaction.create({name,amount});  //we can also do that

    res.status(201).json(addExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const updateExpense = await Transaction.findByIdAndUpdate(
      req.params.id,
      { name, amount },
      { new: true } //Return the update value
    );
    if (!updateExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res
      .status(200)
      .json({ message: "Expense update successfully", updateExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({ error: "Invalid Expense ID" });
  // }
  try {
    const expense = await Transaction.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      //we can also write this to cath invalid object error
      return res.status(400).json({ error: "Invalid Expense ID format." });
    }
    res.status(500).json({ error: error.message });
  }
};
