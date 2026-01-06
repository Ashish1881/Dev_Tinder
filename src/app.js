const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("wellcome to backend ");
});

app.use("/home", (req, res) => {
  res.send("this is a home page!");
});
app.listen(3000, () => {
  console.log("Server is runing on port 3000..");
});
