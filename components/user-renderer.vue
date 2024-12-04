<template>
  <div>
    <h2>{{ props.entry.name }}</h2>
    <pre>{{ props.entry }}</pre>
  </div>
</template>

<script lang="ts" setup>
type User = {
  id: string;
  name: string;
};

const props = defineProps<{
  entry: User;
}>();
</script>

<style scoped>
h2 {
  color: rebeccapurple;
}
</style>
