<template>
  <h1>Users</h1>
  <ul>
    <UserListPage
      v-for="(variables, index) in pageVariables"
      :key="variables.after"
      :first="10"
      :after="variables.after"
      :is-last-page="index === pageVariables.length - 1"
      @onLoadMore="handleLoadMore"
    />
  </ul>
</template>
<script lang="ts" setup>
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
