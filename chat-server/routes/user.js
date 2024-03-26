const router = require("express").Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.patch("/update-me", authController.protect, userController.updateMe);

router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-friends", authController.protect, userController.getFriends);
router.get(
  "/get-friend-requests",
  authController.protect,
  userController.getRequests
);

module.exports = router;
