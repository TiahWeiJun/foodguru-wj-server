const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const express = require("express");
const typeDefs = require("./graphql/schema.js");
const resolvers = require("./graphql/resolvers/index.js");
require("dotenv").config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await mongoose.connect(
    "mongodb+srv://weijun:tiahweijun@cluster0.utp7w.mongodb.net/Food?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  await server.start();

  app.get("/", (req, res) => {
    res.send("hello");
  });

  app.use(express.static("public"));

  server.applyMiddleware({ app });
  app.use(cors());
  // The `listen` method launches a web server.
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server ready`);
  });
};

try {
  startServer();
} catch (error) {}
