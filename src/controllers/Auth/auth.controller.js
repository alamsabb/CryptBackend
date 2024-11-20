const User = require("../../models/user.model/user.models");
const Admin = require("../../models/user.model/admin.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      userName,
      fullName,
      referalNumber, // Default to null if not provided
      // Wallet number will default from the schema
      amount = 100, // Default to 100 if not provided
      transferWalletNumber,
    } = req.body;
    let walletNumber = req.body.walletNumber || undefined;

    // Validate required fields
    if (
      !email ||
      !password ||
      !userName ||
      !referalNumber ||
      !transferWalletNumber
    ) {
      return res
        .status(400)
        .json({ message: "Email, password, and username are required." });
    }
    // if (walletNumber === "") {
    //   walletNumber = null;
    // }
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      userName,
      fullName,
      referalNumber,
      walletNumber, // Will use schema default if not provided
      amount: Number(amount), // Will use schema default if not provided
      transferWalletNumber,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (e) {
    console.error("ERROR IN REGISTER FUNCTION----------->", e);

    // Handle duplicate email or userName errors
    if (e.code === 11000) {
      const field = Object.keys(e.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    res.status(500).json({ message: "An error occurred during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("password not match");
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const response = {
      userName: user.userName,
      email: user.email,
      walletNumber: user.walletNumber,
      transferWalletNumber: user.transferWalletNumber,
      amount: user.amount,
      verification: user.verification,
    };
    res.status(200).json({ message: "User login successfully", response });
  } catch (error) {
    console.log("ERROR IN THE LOGIN FUNCTION----------->", error);
    res.status(500).json({ message: "An error occure in the login" });
  }
};

exports.admninRegister = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json({ message: "Email, password, and username are required." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      userName,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log("ERROR IN THE ADMIN REGISTER FUNCTION----------->", error);
    res.status(500).json({ message: "An error occure in the admin register" });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Admin login successfully" });
  } catch (error) {
    console.log("ERROR IN THE ADMIN LOGIN FUNCTION----------->", error);
    res.status(500).json({ message: "An error occure in the admin login" });
  }
};

exports.verifyAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(
      { walletNumber: id },
      { verification: "VERIFIED" },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid wallet number" });
    }
    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.log("ERROR IN THE VERIFY ACCOUNT FUNCTION----------->", error);
    res.status(500).json({ message: "An error occure in the verify account" });
  }
};
