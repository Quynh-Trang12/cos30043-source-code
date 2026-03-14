<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <h1>Full CRUD With Vue.js</h1>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink> |
    <RouterLink to="/about">Go to About</RouterLink> |
    <RouterLink to="/products">Go to Products</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
