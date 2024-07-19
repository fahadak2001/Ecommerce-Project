const orderModel = require("../model/order");
const productModel = require("../model/product");
const jwt = require("jsonwebtoken");

const createOrder = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    userID = decodedToken.id;
    const { productID } = req.body;
    console.log(productID);
    const product = await productModel.findById(productID);
    const ourProduct = await orderModel.create({
      product: productID,
      user: userID,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.images,
    });
    res
      .status(200)
      .json({ success: true, mssg: "order created sucessfully", ourProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

const getOrderbyID = async (req, res) => {
  try {
    const { orderID } = req.body;
    const findOrder = await orderModel.findById(orderID).populate("user");
    console.log(findOrder);
    if (!findOrder) {
      res.status(400).json({
        mssg: "not found order id",
      });
    }

    res.status(200).json({ findOrder });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

const getOrderbyUserId = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const userID = decodedToken.id;
    const foundOrders = await orderModel.find({ user: userID });
    res.status(200).json({
      mssg: "orders Found",
      foundOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      sucess: true,
    });
  }
};

const deleteOrderbyUserID = async (req, res) => {
  try {
    const { userID } = req.body;
    const foundOrders = await orderModel.deleteMany({ user: userID });
    console.log(foundOrders);
    res.status(200).json({
      mssg: "orders found",
      foundOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

const deleteOrderbyOrderID = async (req, res) => {
  try {
    const { orderID } = req.body;
    const foundOrders = await orderModel.findOneAndDelete({ _id: orderID });

    res.status(200).json({ message: "product delete" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};
const countOrders = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decodedToken.id;
      const count = await orderModel.countDocuments({ user: userID });
      res.status(200).json({ count, message: "count returned" });
    } else {
      const count = 0;
      res.status(200).json({ count, message: "no JWT 0 count returned" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getOrderbyID,
  getOrderbyUserId,
  deleteOrderbyUserID,
  deleteOrderbyOrderID,
  countOrders,
};
