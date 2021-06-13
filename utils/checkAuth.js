const jwt = require("jsonwebtoken");
const pkg = require("apollo-server");
const { AuthenticationError } = pkg;
const SECRET_KEY = require("./key");

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        console.log(err);
        throw new Error("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication token must be correct");
  }
  throw new Error("Authentication header must be provided");
};

module.exports = checkAuth;
