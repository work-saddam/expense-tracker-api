const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/auth.js");
const {checkPermission} = require("../middleware/rbac.js");


router.get("/",auth ,checkPermission("read_record"), expenseController.getAllExpenses);
// router.get("/view",auth, expenseController.getAllExpenses);  //for ejs

// router.get("/:id",auth, expenseController.getExpenseById);
router.post("/",auth,checkPermission("create_record"), expenseController.addExpense);
router.delete("/:id",auth,checkPermission("delete_record"), expenseController.deleteExpense);
router.put("/:id",auth,checkPermission("update_record"), expenseController.updateExpense);

router.get("/filter",auth, checkPermission("read_record"), expenseController.filterExpenses)
router.get("/report",auth,checkPermission("generate_report"), expenseController.exportExpensesToCSV)

module.exports = router;
