const pkg = require("mongoose");
const { Schema, model } = pkg;

const userSchema = new Schema({
  username: String,
  password: String,
  createdAt: String,
  email: String,
  visitedPlaces: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = model("User", userSchema);
module.exports = User;
