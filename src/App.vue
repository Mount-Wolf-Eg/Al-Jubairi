<script setup>
import { RouterLink, RouterView } from "vue-router";
import MainLayout from "./components/global/layout/MainLayout.vue";
</script>
<!-- include="Home,About" route names -->
<template>
  <main style="flex: 1">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </main>
</template>

<style scoped></style>
