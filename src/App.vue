<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
import SplashScreen from "./components/locale/custom-components/SplashScreen.vue";
import MainLayout from "./components/global/layout/MainLayout.vue";
const route = useRoute();
// store
import { useSettingsStore } from "./stores/settingStore";

const isLoading = ref(true);

onBeforeMount(async () => {
  await useSettingsStore().getSettings();
  isLoading.value = false;
});

onMounted(() => {
  if (sessionStorage.getItem("lang") == null)
    sessionStorage.setItem("lang", "ar");
});
</script>
<template>
  <main
    v-if="!isLoading"
    style="flex: 1; width: 100vw"
    :style="{
      background:
        route.name === 'home' ||
        route.name === 'Employee' ||
        route.name === 'BlogDetail'
          ? '#fff '
          : '#151516',
    }"
  >
    <MainLayout>
      <RouterView />
    </MainLayout>
  </main>
  <main v-else>
    <SplashScreen />
  </main>
</template>

<style scoped></style>
