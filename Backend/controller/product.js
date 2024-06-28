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
  let { page, pageSize, category } = req.query;
  try {
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 50;
    const skip = (page - 1) * pageSize;

    let query = {};
    if (category) {
      query.category = category;
    }
    const totalProductsCat = await productModel.find(query).countDocuments();
    const products = await productModel.find(query).skip(skip).limit(pageSize);
    const totalProducts = await productModel.countDocuments();
    res.status(200).json({
      totalProductsCat,
      success: true,
      page,
      pageSize,
      totalProducts,
      totalPages: Math.ceil(totalProductsCat / pageSize),
      products,
    });
  } catch (error) {
    res.status(400).json({ message: "Unsuccessful", error });
  }
  // console.log("test");
  // try {
  //   const products = await productModel.find();
  //   res.status(200).json({ success: true, data: products });
  // } catch (error) {
  //   res.status(400).json({ success: false });
  // }
};

module.exports = {
  createProduct,
  readProduct,
  deleteProduct,
  updateProduct,
  allProduct,
};
