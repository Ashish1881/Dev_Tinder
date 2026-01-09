const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.models");

const app = express();

app.use(express.json());

// signup API
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User data save Secssefully");
  } catch (err) {
    res.status(500).send("user data is not save " + err.message);
    console.log(err.message);
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
    throw new error();
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
