<template>
  <li v-if="fetching">Loading...</li>
  <li v-else-if="error">Error</li>
  <li v-for="edge in data?.entries.edges" :key="edge.node.id">
    <pre>{{ edge.cursor }}</pre>
    <component :is="props.itemRenderer" :entry="edge.node" />
  </li>
  <li
    v-if="
      data?.entries.pageInfo.hasNextPage &&
      data?.entries.pageInfo.endCursor &&
      props.isLastPage
    "
  >
    <button @click="emit('onLoadMore', data?.entries.pageInfo.endCursor)">
      Load more
    </button>
  </li>
</template>
<script lang="ts" setup>
import { useQuery, type TypedDocumentNode } from "@urql/vue";

const props = defineProps<{
  first: number;
  after?: string;
  isLastPage: boolean;
  pageQuery: TypedDocumentNode;
  itemRenderer: Component;
}>();

const emit = defineEmits<{
  onLoadMore: [after: string];
}>();

const { data, fetching, error } = useQuery({
  query: props.pageQuery,
  variables: { first: props.first, after: props.after },
});
</script>
