const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");
const pkg = require("apollo-server");
const { UserInputError } = pkg;
const SECRET_KEY = require("../../utils/key");

const generateToken = (result) => {
  return jwt.sign(
    {
      id: result._id,
      email: result.email,
      username: result.username,
    },
    SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

const userResolvers = {
  Query: {},
  Mutation: {
    register: async (_, { username, password, email }, context, info) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            message: "This username is taken",
          },
        });
      }

      const user1 = await User.findOne({ email });
      if (user1) {
        throw new UserInputError("Email is taken", {
          errors: {
            message: "This email is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();

      const token = generateToken(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
    login: async (_, { email, password }) => {
      console.log(SECRET_KEY);
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("Email not found", {
          errors: {
            message: "The username does not exist",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Incorrect password", {
          errors: {
            message: "The password is incorrect",
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

module.exports = userResolvers;
