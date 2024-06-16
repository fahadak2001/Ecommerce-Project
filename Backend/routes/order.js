const express = require("express");
const {
  createOrder,
  getOrderbyID,
  getOrderbyUserId,
  deleteOrderbyUserID,
  deleteOrderbyOrderID,
  countOrders,
} = require("../controller/order");
const router = express();

router.post("/order/create", createOrder);
router.get("/order/id", getOrderbyID);
router.get("/order/userid", getOrderbyUserId);
router.post("/order/delete/user", deleteOrderbyUserID);
router.post("/order/delete/order", deleteOrderbyOrderID);
router.get("/order/count", countOrders);

module.exports = router;
