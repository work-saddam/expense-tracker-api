const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/auth.js");


router.get("/",auth, expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", expenseController.addExpense);
router.delete("/:id", expenseController.deleteExpense);
router.put("/:id",expenseController.updateExpense);

module.exports = router;