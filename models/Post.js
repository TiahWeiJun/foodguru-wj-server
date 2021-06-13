const pkg = require("mongoose");
const { Schema, model } = pkg;

const postSchema = new Schema({
  generalLocation: String,
  address: String,
  cuisine: [String],
  nameOfHawkerCenter: String,
  nameOfShop: String,
  nameOfFood: String,
  description: String,
  imageURL: String,
  createdAt: String,
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  username: String,
  type: String,
  isHalal: Boolean,
  isAirCon: Boolean,
  price: Number,
  filterString: String,
});

const Post = model("Post", postSchema);
module.exports = Post;
