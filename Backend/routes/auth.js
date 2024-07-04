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
const { registerAdmin, loginAdmin } = require("../controller/admin");
const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/auth", authenticateToken);
router.post("/user/forget", forgetPassword);
router.post("/user/reset/:token", resetPassword);
router.post("/user/change", changePassword);
router.post("/user/logout", logout);

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

module.exports = router;
