<template>
  <h1>Users</h1>
  <PaginatedList :item-renderer="UserRenderer" :page-query="query" />
</template>

<script lang="ts" setup>
import UserRenderer from "~/components/user-renderer.vue";
import { graphql } from "~/gql";

const query = graphql(
  `
    query Users($first: Int, $after: String) {
      entries: users(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `
);
</script>
