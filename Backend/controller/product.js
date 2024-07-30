const productModel = require("../model/product");
const multer = require("multer");

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
    } = req.body;
    const imagesss = req.files.map((file) => {
      const fileBase64 = file.buffer.toString("base64");
      const mimeType = file.mimetype;
      return `data:${mimeType};base64,${fileBase64}`;
    });

    const createdProduct = await productModel.create({
      title: title,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      rating: rating,
      stock: stock,
      brand: brand,
      category: category,
      thumbnail: imagesss[0],
      images: imagesss,
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
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, mssg: "Product ID is required" });
    }

    const foundProduct = await productModel.findById(productId);
    if (foundProduct) {
      return res
        .status(200)
        .json({ mssg: "Product found successfully", foundProduct });
    } else {
      return res
        .status(404)
        .json({ success: false, mssg: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mssg: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const foundproduct = await productModel.findOneAndDelete({ _id: id });
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
    pageSize = parseInt(pageSize, 10) || 100;
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
