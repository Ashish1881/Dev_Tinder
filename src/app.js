const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.models");
const { validateSignup } = require("./Utils/validateSignup");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

// signup API
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Incredential Data");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    const token = await jwt.sign(
      { _id: user._id },
      "DEV@Tender$deloperAshish#123"
    );

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

// Profile API
app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not found plaese login..");
    }
    const decodedData = await jwt.verify(token, "DEV@Tender$deloperAshish#123");

    const { _id } = decodedData;

    const userProfile = await User.findById(_id);

    res.send(userProfile);
  } catch (error) {
    res.status(401).send("ERROR : " + error.message);
  }
});

// Delete API

app.delete("/user", async (req, res) => {
  const id = req.body._id;
  console.log(id);

  try {
    await User.findByIdAndDelete({ _id: id });

    res.send("User is Deleted Successfuly");
  } catch (error) {
    throw new error("ERROR : ", error.message);
  }
});

// Update API
app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "password",
      "age",
      "gender",
      "skills",
      "photoURI",
      "about",
    ];

    const NOTALLOWED = ["email", "lastName", "firstName"];
    const notAllowedFelad = Object.keys(data).filter((k) =>
      NOTALLOWED.includes(k)
    );
    if (notAllowedFelad.length > 0) {
      res.status(400).send(`This fields are not allowd ${notAllowedFelad}`);
    }

    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdate) {
      throw new Error("Given data is not allowd for update");
    }
    // await User.findByIdAndUpdate(id, data);
    const updateData = await User.findByIdAndUpdate(id, data, {
      runValidators: true,
    });
    console.log(updateData);

    res.send("User data update Sucessfully");
  } catch (error) {
    console.log("somthing went worng ", error.message);
    res.status(500).send(`Your data not Update ${error.message}`);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({ age: { $gt: 20 } });
    if (!user) {
      res.status(404).send("User is not fond");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log("somthing went worng ");
  }
});

connectDB()
  .then(() => {
    console.log("Database is connected secssefuly");
    app.listen(3000, () => {
      console.log("server is runing on 3000");
    });
  })
  .catch((err) => {
    console.error("Database can not connected !!");
  });
