const Post = require("../../models/Post.js");
const checkAuth = require("../../utils/checkAuth.js");
const { deleteFile } = require("../../s3");

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    getPost: async (_, { postID }) => {
      try {
        const post = await Post.findById(postID);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      // const user = checkAuth(context);
      const {
        generalLocation,
        address,
        cuisine,
        nameOfHawkerCenter,
        nameOfShop,
        nameOfFood,
        description,
        imageURL,
        username,
        type,
        isHalal,
        isAirCon,
        price,
      } = args;

      let halal;
      let airCon;

      isHalal ? (halal = "halal") : (halal = null);
      isAirCon ? (airCon = "airConditioned") : (airCon = null);

      const rawString = "".concat(
        generalLocation.concat(","),
        address.concat(","),
        cuisine.concat(","),
        nameOfHawkerCenter?.concat(","),
        nameOfShop.concat(","),
        nameOfFood.concat(","),
        halal?.concat(","),
        airCon?.concat(","),
        type.concat(",")
      );

      const filterString = rawString.toLowerCase().replace(/\s/g, "");

      const newPost = new Post({
        // body,
        // user: user.id,
        // username: user.username,
        // createdAt: new Date().toISOString(),
        ...args,
        filterString,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();

      // context.pubsub.publish("NEW_POST", {
      //   newPost: post,
      // });

      return post;
    },
    deletePost: async (_, { postID }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postID);
        if (!post) {
          throw new Error("Post not found");
        }

        if (user.username === post.username) {
          await post.delete();
          // await deleteFile(post.imageURL);
          return "Post deleted successfully";
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postID }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postID);
      if (post) {
        const likeIndex = post.likes.findIndex(
          (like) => like.username === username
        );
        if (!post.likes[likeIndex]) {
          const newLike = {
            username,
            createdAt: new Date().toISOString(),
          };
          post.likes.unshift(newLike);
        } else {
          post.likes.splice(likeIndex, 1);
        }

        await post.save();
        return post;
      }
      throw new Error("Post not found");
    },
  },
  // Subscription: {
  //   newPost: {
  //     subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
  //   },
  // },
};

module.exports = postResolvers;
