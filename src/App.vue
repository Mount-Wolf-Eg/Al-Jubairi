<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MainLayout from "./components/global/layout/MainLayout.vue";

onMounted(() => {
  if (sessionStorage.getItem("lang") == null)
    sessionStorage.setItem("lang", "ar");
});
</script>
<template>
  <main style="flex: 1; width: 100vw">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </main>
</template>

<style scoped></style>
