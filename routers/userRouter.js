const express = require("express");
const router = express.Router();
const UserModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    res.status(500).send(error);
  }
});

//login user
router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError("No user found..!!"));

    //comparing the password
    const isPasswordVerify = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordVerify)
      return next(createError("Wrong username or password..!!"));

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);

    // res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
