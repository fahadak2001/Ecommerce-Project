const express = require("express");
const createPayment = require("../controller/payment");
const router = express();

router.post("/payment/create", createPayment);

module.exports = router;
