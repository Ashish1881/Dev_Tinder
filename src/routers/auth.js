const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const { validateSignup } = require("../Utils/validateSignup");

const authRouter = express.Router();

// signup API
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // validate signup API
    validateSignup(req);

    // Password bycript
    const bcryptPassword = await bcrypt.hash(password, 10);
    console.log(bcryptPassword);

    const user = new User({
      firstName,
      lastName,
      email,
      password: bcryptPassword,
    });

    await user.save();
    res.send("User data save Secssefully");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Incredential Data");
    }

    const isCorrectPassword = await user.comparePassword(password);

    const token = await user.getJWT();

    if (isCorrectPassword) {
      res.cookie("token", token);
      res.send("Login Successfully !");
    } else {
      throw new Error("Incredential Data");
    }
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

module.exports = authRouter;
