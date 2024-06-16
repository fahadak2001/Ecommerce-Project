const productModel = require("../model/product");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;
    const createdProduct = await productModel.create({
      title: title,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      rating: rating,
      stock: stock,
      brand: brand,
      category: category,
      thumbnail: thumbnail,
      images: images,
    });
    res.status(201).json({
      succes: true,
      msg: "product created successfully",
      createdProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

const readProduct = async (req, res) => {
  try {
    const { productName } = req.body;
    const foundproduct = await productModel.findOne({ productName });
    if (foundproduct) {
      res.status(200).json({ mssg: "product found succesfully" });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productName } = req.body;
    const foundproduct = await productModel.findOneAndDelete({ productName });
    if (foundproduct) {
      res.status(200).json({ mssg: "product deleted succesfully" });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productName, name } = req.body;
    const foundproduct = await productModel.findOneAndUpdate(
      { title: productName },
      { name }
    );
    console.log(foundproduct);
    if (foundproduct) {
      return res.status(200).json({ mssg: "product updated succesfully" });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const allProduct = async (req, res) => {
  console.log("test");
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createProduct,
  readProduct,
  deleteProduct,
  updateProduct,
  allProduct,
};
