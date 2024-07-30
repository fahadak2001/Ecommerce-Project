const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Transport = require("../utils/sendMail");
const admin = require("../model/admin");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({
        sucess: false,
        mssg: "email already exist",
      });
    } else {
      const registerUser = await user.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
      });
      const token = jwt.sign(
        {
          email: registerUser.email,
          id: registerUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(201).json({
        succes: true,
        msg: "user registered successfully",
        registerUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      mssg: "unable to register user",
      error: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req?.cookies);
  try {
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found, please create account",
      });
    }
    const validatePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    console.log("validatePassword", validatePassword);
    if (!validatePassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
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

const authenticateToken = async (req, res) => {
  try {
    console.log("Auth");
    const { token } = req.cookies;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userid = decodedToken.id;
    const User = await user.findById(userid);
    if (User) {
      res.status(200).json({
        User,
        message: "Successfully authenticated",
        isAuthenticated: true,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid request!" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const foundEmail = await user.findOne({ email });
    console.log(foundEmail._id);
    if (foundEmail) {
      const token = await jwt.sign(
        {
          email: foundEmail.email,
          id: foundEmail._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log(token);
      await Transport.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        text: `This is a test email sent using Nodemailer. Here is your link: http://localhost:3000/reset/${token}`,
      });
      res
        .status(200)
        .json({ success: true, message: "Reset token sent to email." });
    } else {
      res.status(400).json({ success: false, message: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const { newPassword } = req.body;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    decodedTokenId = decodedToken.id;

    const foundUser = await user.findById(decodedTokenId);
    console.log("user found", foundUser);

    if (foundUser) {
      foundUser.password = hashedPassword;
      await foundUser.save();
      res.status(200).json({ mssg: "sucessfully" });
    } else {
      res.status(400).json({ mssg: "user not found from the token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const validatePassword = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );
      if (validatePassword) {
        existingUser.password = hashedNewPassword;
        await existingUser.save();
        res
          .status(200)
          .json({ sucess: true, mssg: "password changed sucessfully" });
      } else {
        res
          .status(401)
          .json({ sucess: false, mssg: "old password isnt correct" });
      }
    } else {
      console.log(error);
      res.status(404).json({
        error: new Error("user dont exist"),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

const logout = async function (req, res) {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({
      success: true,
      message: "User Logout",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { authAdmin } = decodedToken.email;
    const foundAdmin = await admin.findOne({ authAdmin });
    const allUsers = await user.find();
    if (foundAdmin) {
      res.status(200).json({ sucess: true, allUsers });
    }
  } catch (error) {
    res.status(401).json({ sucess: false, message: "Unable to get users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const deleteUser = await user.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "user deleted", deleteUser });
  } catch (error) {
    res.status(400).json({ sucess: false, message: "Unable to delete users" });
  }
};

module.exports = {
  register,
  login,
  authenticateToken,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
  getAllUsers,
  deleteUser,
};
