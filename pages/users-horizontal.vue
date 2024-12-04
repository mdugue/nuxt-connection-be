<template>
  <h1>Users</h1>
  <PaginatedList
    :item-renderer="UserRenderer"
    :page-query="query"
    class="users-horizontal"
  />
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

<style>
.users-horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    border: 1px solid #ccc;
    padding: 1rem;
  }
}
</style>
