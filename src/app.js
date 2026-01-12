const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.models");
const { validateSignup } = require("./Utils/validateSignup");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/Auth");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
