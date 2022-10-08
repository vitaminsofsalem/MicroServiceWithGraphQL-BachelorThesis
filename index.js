import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import mongoClient from "./db.js";
import { typeDefs } from "./schema.js";
import { Product } from "./graphql/resolvers/Product.js";
import { Query } from "./graphql/resolvers/Query.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Product,
    Query,
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
