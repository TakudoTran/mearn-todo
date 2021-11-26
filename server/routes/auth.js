const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require('../middleware/auth')
// @route GET api/auth
// @desc Check if user logged in
// @access public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //simple valid
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "missing username or/and password" });
  try {
    //check for existing user
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "username already taken" });
    }
    //all good
    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "user created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "missing username or/and password" });
  try {
    //check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect username or password " }); //username or password
    }
    // username found => check password
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect username or password" });
    }
    //all good
    //return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
