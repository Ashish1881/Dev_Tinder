const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const userAuth = async (req, res, next) => {
  try {
    // get a Token form req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid Login Please..");
    }
    // validate the token
    const decodedData = await jwt.verify(token, "DEV@Tender$deloperAshish#123");
    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User is not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = {
  userAuth,
};
