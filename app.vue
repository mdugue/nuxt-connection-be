<script setup lang="ts">
import UserRenderer from "~/components/user-renderer.vue";
</script>

<template>
  <div>
    <nav>
      <NuxtLink to="/users">Users</NuxtLink>
      <NuxtLink to="/journeys">Journeys</NuxtLink>
      <NuxtLink to="/users-horizontal">Users Horizontal</NuxtLink>
    </nav>
    <NuxtRouteAnnouncer />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>
<style>
body {
  font-family: sans-serif;
}
</style>
<style scoped>
nav {
  font-weight: bold;
  font-family: sans-serif;
  display: flex;
  gap: 1rem;
}
</style>
