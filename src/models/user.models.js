const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLaength: 50,
      required: true,
    },

    lastName: {
      type: String,
      minLength: 2,
      maxLaength: 50,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/@/, "Invalid Email Please Enter the Valid Email addreass"],
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      require: true,
      min: 18,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
    },

    skills: {
      type: [String],
    },
    photoURI: {
      type: String,
      default:
        "https://www.freepik.com/free-psd/contact-icon-illustration-isolated_397057724.htm#fromView=keyword&page=1&position=3&uuid=daadf36c-2d07-43e6-ba3b-6fc48ad49005&query=Default+user",
    },
    about: {
      type: String,
      default: "I use DevTinder",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
