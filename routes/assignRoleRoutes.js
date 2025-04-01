const express  = require("express")
const router = express.Router();
const auth = require("../middleware/auth")
const {checkPermission} = require("../middleware/rbac")

const assignRoleController = require("../controllers/assignRoleControllers")

router.get("/:id",auth,checkPermission("assign_role"), assignRoleController.getRole)

module.exports = router;