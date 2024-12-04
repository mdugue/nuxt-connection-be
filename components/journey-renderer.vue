<template>
  <div class="journey">
    <h2>{{ props.entry.name }}</h2>
    <div class="journey-details">
      <p>{{ props.entry.from }}</p>
      ->
      <p>{{ props.entry.to }}</p>
    </div>
    <pre>{{ props.entry }}</pre>
  </div>
</template>

<script lang="ts" setup>
type Journey = {
  id: string;
  name: string;
  from: string;
  to: string;
};

const props = defineProps<{
  entry: Journey;
}>();
</script>

<style scoped>
.journey {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;

  h2 {
    color: teal;
  }

  pre {
    margin-left: auto;
  }
  .journey-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
