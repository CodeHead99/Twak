const router = require("express").Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.patch("/update-me", authController.protect, userController.updateMe)

module.exports = router;