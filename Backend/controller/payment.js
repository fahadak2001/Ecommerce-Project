const paymentModel = require("../model/payment");

const createPayment = async (req, res) => {
  try {
    const { paymentMethod, order, paymentStatus } = req.body;
    const createdPayment = paymentModel.create({
      paymentMethod: paymentMethod,
      order: order,
      paymentStatus: paymentStatus,
    });
    res.status(200).json({
      sucess: true,
      createdPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

module.exports = createPayment;
