const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js")
const {checkPermission} = require("../middleware/rbac.js")

const authController = require("../controllers/authController.js")


router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);
router.put("/:id", auth, checkPermission("update_user"), authController.updateUser)
router.delete("/:id",auth,checkPermission("delete_user"), authController.deleteUser )

module.exports = router;
