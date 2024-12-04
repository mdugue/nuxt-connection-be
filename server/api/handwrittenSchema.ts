import { createSchema } from "graphql-yoga";
import { mockjourneys, mockUsers } from "./db";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      users(first: Int, after: String): UserConnection!
      journeys(first: Int, after: String): JourneyConnection!
    }

    ### relay spec ###

    interface Node {
      id: ID!
    }

    type PageInfo {
      endCursor: String
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
    }

    ### interfaces for reusable pagination logic ###

    interface Connection {
      edges: [Edge!]!
      pageInfo: PageInfo!
    }

    interface Edge {
      cursor: String!
      node: Node!
    }

    ### acutal types ###

    type UserConnection implements Connection {
      edges: [UserEdge!]!
      pageInfo: PageInfo!
    }

    type UserEdge implements Edge {
      cursor: String!
      node: User!
    }

    type User implements Node {
      id: ID!
      name: String!
    }

    type JourneyConnection implements Connection {
      edges: [JourneyEdge!]!
      pageInfo: PageInfo!
    }

    type Journey implements Node {
      id: ID!
      name: String!
      from: String!
      to: String!
    }

    type JourneyEdge implements Edge {
      cursor: String!
      node: Journey!
    }
  `,
  resolvers: {
    Query: {
      users: (_, { first, after }) => {
        return connectionResolver(mockUsers, "User", after, first);
      },
      journeys: (_, { first, after }) => {
        return connectionResolver(mockjourneys, "Journey", after, first);
      },
    },
  },
});

/**
 * Turn a list of items into a relay connection object including pagination filtering logic, global id and cursor
 */
function connectionResolver<T extends { id: number }>(
  list: T[],
  typeName: string,
  after: string = "0",
  first: number = 10
) {
  const entriesFound = list.filter((user) => user.id >= parseInt(after, 10));
  const entriesToReturn = entriesFound.slice(0, first);

  const hasNextPage = entriesFound.length > entriesToReturn.length;
  const endCursor = entriesFound.slice(first, first + 1).at(0)?.id;

  return {
    edges: entriesToReturn.map((item) => ({
      cursor: item.id,
      node: toRelayNode(item, typeName),
    })),

    pageInfo: { endCursor, hasNextPage },
  };
}

function toRelayNode<T extends { id: number }>(node: T, typeName: string) {
  return {
    ...node,
    id: btoa(`${typeName}:${node.id}`),
  };
}
