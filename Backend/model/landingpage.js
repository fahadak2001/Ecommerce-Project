const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
    },
  ],
});

const landingPageModel = mongoose.model(landingPage, landingPageSchema);
module.exports = landingPageModel;
