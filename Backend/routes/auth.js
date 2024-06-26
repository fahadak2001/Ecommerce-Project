const express = require("express");
const {
  login,
  register,
  authenticateToken,
  resetPassword,
  forgetPassword,
  changePassword,
  logout,
} = require("../controller/user");
const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/auth", authenticateToken);
router.post("/user/forget", forgetPassword);
router.post("/user/reset/:token", resetPassword);
router.post("/user/change", changePassword);
router.post("/user/logout", logout);

module.exports = router;
