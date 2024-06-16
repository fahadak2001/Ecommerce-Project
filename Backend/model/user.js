const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required field"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required field"],
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
  },
  password: {
    type: String,
    required: [true, "Password is required field"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userschema);

module.exports = userModel;
