<template>
  <ul v-bind="$attrs">
    <PaginatedListPage
      v-for="(variables, index) in pageVariables"
      :key="variables.after"
      :first="10"
      :after="variables.after"
      :is-last-page="index === pageVariables.length - 1"
      :item-renderer="props.itemRenderer"
      @on-load-more="handleLoadMore"
      :page-query="props.pageQuery"
    />
  </ul>
</template>

<script lang="ts" setup>
import type { TypedDocumentNode } from "@urql/vue";
import PaginatedListPage from "~/components/paginated-list/paginated-list-page.vue";

const props = defineProps<{
  itemRenderer: Component;
  pageQuery: TypedDocumentNode;
}>();

const pageVariables = ref<Array<{ first: number; after: string | undefined }>>([
  { first: 10, after: undefined },
]);

const handleLoadMore = (after: string) => {
  console.log("handleLoadMore", after);
  pageVariables.value.push({ first: 10, after });
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
