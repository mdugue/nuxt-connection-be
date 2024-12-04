import { createYoga } from "graphql-yoga";
import { schema } from "./handwrittenSchema";

// Create a GraphQL Yoga server
const yoga = createYoga({ schema, graphqlEndpoint: "/api/graphql" });

// Define the Nuxt event handler to expose the GraphQL API
export default defineEventHandler((event) => {
  const { req, res } = event.node;
  return yoga(req, res);
});
