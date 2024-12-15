<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
import MainLayout from "./components/global/layout/MainLayout.vue";
const route = useRoute();

onMounted(() => {
  if (sessionStorage.getItem("lang") == null)
    sessionStorage.setItem("lang", "ar");
});
</script>
<template>
  <main
    style="flex: 1; width: 100vw"
    :style="{
      background:
        route.name === 'home' ||
        route.name === 'Employee' ||
        route.name === 'Achievement'
          ? '#fff '
          : '#151516',
    }"
  >
    <MainLayout>
      <RouterView />
    </MainLayout>
  </main>
</template>

<style scoped></style>
