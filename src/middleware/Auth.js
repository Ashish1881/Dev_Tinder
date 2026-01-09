const auth = (req, res, next) => {
  const token = "xyz";
  const isAuthorize = token === "xyz";
  console.log("admin authentication");

  if (!isAuthorize) {
    res.status(401).send("your are not Authorized parsen");
  } else {
    next();
  }
};

const user = (req, res, next) => {
  const token = "xyz";
  const isAuthorize = token === "xyz";
  console.log("User Auth call");

  if (!isAuthorize) {
    res.status(401).send("User is not a Authorized");
  } else {
    next();
  }
};

module.exports = {
  auth,
  user,
};
