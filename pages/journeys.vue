<template>
  <h1>Journeys</h1>
  <PaginatedList :item-renderer="JourneyRenderer" :page-query="query" />
</template>

<script lang="ts" setup>
import JourneyRenderer from "~/components/journey-renderer.vue";
import { graphql } from "~/gql";

const query = graphql(
  `
    query Journeys($first: Int, $after: String) {
      entries: journeys(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
            from
            to
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
