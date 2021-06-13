const postResolvers = require("./posts.js");
const userResolvers = require("./users.js");
const fileResolvers = require("./files.js");

const allResolvers = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
    // ...commentResolvers.Query,
    ...fileResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    // ...commentResolvers.Mutation,
    ...fileResolvers.Mutation,
  },
  // Subscription: {
  //   ...postResolvers.Subscription,
  // },
  Post: {
    likeCount: (parent) => parent.likes.length,
  },
};

module.exports = allResolvers;
