const express = require("express");
const {
  createProduct,
  readProduct,
  deleteProduct,
  updateProduct,
  allProduct,
} = require("../controller/product");
const router = express.Router();

router.post("/product/create", createProduct);
router.post("/product/find/:productId", readProduct);
router.delete("/product/delete", deleteProduct);
router.patch("/product/update", updateProduct);
router.get("/product/all", allProduct);

module.exports = router;
