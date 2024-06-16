const mongoose = require("mongoose");
const orderModel = require("./order");

const paymentSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: orderModel,
  },
  paymentStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentModel = mongoose.model("payment", paymentSchema);
module.exports = paymentModel;
