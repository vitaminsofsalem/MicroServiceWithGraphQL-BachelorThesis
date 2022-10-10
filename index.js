import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import mongoClient from "./db.js";
import { typeDefs } from "./schema.js";
import { Query } from "./graphql/resolvers/Query.js";
import { Mutation } from "./graphql/resolvers/Mutation.js";
import { Category } from "./graphql/resolvers/Category.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Mutation
  },
  csrfPrevention: true,
  cache: "bounded",
  context: async () => ({
    db: await mongoClient(),
  }),
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
