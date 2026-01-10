const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("The Name is Required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Eter the Valide email address ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Eter the Strong Password");
  }
};

module.exports = {
  validateSignup,
};
