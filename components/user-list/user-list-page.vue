<template>
  <li v-if="fetching">Loading...</li>
  <li v-else-if="error">Error</li>
  <li v-for="userEdge in data?.users.edges" :key="userEdge.node.id">
    <pre>{{ userEdge.cursor }}</pre>
    <pre>{{ userEdge.node.id }}</pre>
    <div>{{ userEdge.node.name }}</div>
  </li>
  <li
    v-if="
      data?.users.pageInfo.hasNextPage &&
      data?.users.pageInfo.endCursor &&
      props.isLastPage
    "
  >
    <button @click="emit('onLoadMore', data?.users.pageInfo.endCursor)">
      Load more
    </button>
  </li>
</template>
<script lang="ts" setup>
import { useQuery } from "@urql/vue";
import { graphql } from "@/gql";

const props = defineProps<{
  first: number;
  after?: string;
  isLastPage: boolean;
}>();

const emit = defineEmits<{
  onLoadMore: [after: string];
}>();

const { data, fetching, error } = useQuery({
  query: graphql(
    `
      query Users($first: Int, $after: String) {
        users(first: $first, after: $after) {
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
  ),
  variables: { first: props.first, after: props.after },
});
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  &:nth-child(even) {
    background-color: #f0f0f0;
  }
}
</style>
