<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
import SplashScreen from "./components/locale/custom-components/SplashScreen.vue";
import MainLayout from "./components/global/layout/MainLayout.vue";
import moment from "moment";

const route = useRoute();
// store
import { useSettingsStore } from "./stores/settingStore";

const isLoading = ref(true);

onBeforeMount(async () => {
  await useSettingsStore().getSettings();
  let lang = sessionStorage.getItem("lang") ?? "ar";
  lang == "ar" ? moment.locale("ar-sa") : moment.locale("en-gb");
  isLoading.value = false;
});

onMounted(() => {
  if (sessionStorage.getItem("lang") == null)
    sessionStorage.setItem("lang", "ar");
});

import "moment/dist/locale/ar-sa";
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
