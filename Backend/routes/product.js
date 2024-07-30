const express = require("express");
const {
  createProduct,
  readProduct,
  deleteProduct,
  updateProduct,
  allProduct,
} = require("../controller/product");
const router = express.Router();

const multer = require("multer");
const { storage } = multer.memoryStorage();
const upload = multer({ storage });

router.post("/product/create", upload.array("images", 5), createProduct);

router.post("/product/find/:productId", readProduct);
router.post("/product/delete", deleteProduct);
router.patch("/product/update", updateProduct);
router.get("/product/all", allProduct);

module.exports = router;
