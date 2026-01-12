const express = require("express");
const { userAuth } = require("../middleware/Auth");

const requestRouter = express.Router();

// Connection request API
requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
  const user = req.user.firstName;
  res.send(user + " Connection Request");
});

module.exports = requestRouter;
