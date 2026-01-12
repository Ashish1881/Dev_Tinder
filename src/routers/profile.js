const express = require("express");
const { userAuth } = require("../middleware/Auth");
const profileRouter = express.Router();

// Profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send(user);
  } catch (error) {
    res.status(401).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
