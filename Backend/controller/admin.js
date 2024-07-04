const admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const foundAdmin = await admin.findOne({ email });
    if (!foundAdmin) {
      const registerAdmin = await admin.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
      });
      const token = jwt.sign(
        { email: registerAdmin.email, id: registerAdmin._id },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      res
        .status(201)
        .json({ message: "registered admin success", registerAdmin, token });
    } else {
      res.status(401).json({ message: "admin exists already" });
    }
  } catch (error) {
    res.status(401).json({
      message: "unable to register admin",
      error: error,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not found, please create account",
      });
    }
    const validatePassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    console.log("validatePassword", validatePassword);
    if (!validatePassword) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existingAdmin.email,
        id: existingAdmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token);

    return res
      .status(200)
      .json({ success: true, msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
