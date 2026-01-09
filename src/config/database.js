const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashish:FYhIPV0bYgOKslkt@cluster0.dkb12b1.mongodb.net/divTinder"
  );
};

module.exports = connectDB;
