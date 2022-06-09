const pkg = require("apollo-server");

const { gql } = pkg;

const typeDefs = gql`
  type Post {
    id: ID!
    generalLocation: String!
    address: String!
    cuisine: [String!]!
    nameOfHawkerCenter: String
    nameOfShop: String!
    nameOfFood: String!
    description: String
    imageURL: String
    createdAt: String!
    likes: [Like]!
    likeCount: Int!
    username: String!
    type: String!
    isHalal: Boolean!
    isAirCon: Boolean!
    price: Float!
    filterString: String!
  }
  # type Comment {
  #   id: ID!
  #   body: String!
  #   username: String!
  #   createdAt: String!
  # }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type File {
    url: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    visitedPlaces: [Post]!
  }
  type Query {
    getPosts: [Post]!
    getPost(postID: String!): Post
    getFiles: [String]
  }
  type Mutation {
    register(username: String!, password: String!, email: String!): User

    login(email: String!, password: String!): User

    createPost(
      generalLocation: String!
      address: String!
      cuisine: [String!]!
      nameOfHawkerCenter: String
      nameOfShop: String!
      nameOfFood: String!
      description: String
      imageURL: String
      username: String!
      type: String!
      isHalal: Boolean!
      isAirCon: Boolean!
      price: Float!
    ): Post

    deletePost(postID: String!): String!
    # createComment(postID: ID!, body: String!): Post!
    # deleteComment(postID: ID!, commentID: ID!): Post!
    likePost(postID: String!): Post!
    uploadFile(file: Upload!): File!
  }
  # type Subscription {
  #   newPost: Post!
  # }
`;
module.exports = typeDefs;
