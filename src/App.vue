<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import SplashScreen from "./components/locale/custom-components/SplashScreen.vue";
import MainLayout from "./components/global/layout/MainLayout.vue";
import moment from "moment";
import { useHead } from "@vueuse/head";
import { useSettingsStore } from "./stores/settingStore";

const route = useRoute();
const isLoading = ref(true);

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const currentLang = sessionStorage.getItem("lang") || "ar";

const hreflangs = computed(() => [
  { rel: "alternate", hreflang: "en", href: `${baseUrl}/en${route.fullPath}` },
  { rel: "alternate", hreflang: "ar", href: `${baseUrl}/ar${route.fullPath}` },
]);

useHead({
  title: "AL Jubairi Law Firm - شركة الجبيري للمحاماة",
  meta: [
    {
      name: "description",
      content: "AL Jubairi Law Firm - شركة الجبيري للمحاماة",
    },
    {
      name: "og:title",
      content: "AL Jubairi Law Firm - شركة الجبيري للمحاماة",
    },
  ],
  link: hreflangs.value,
});

onBeforeMount(async () => {
  await useSettingsStore().getSettings();
  currentLang === "ar" ? moment.locale("ar-sa") : moment.locale("en-gb");
  isLoading.value = false;
});

onMounted(() => {
  if (!sessionStorage.getItem("lang")) sessionStorage.setItem("lang", "ar");
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
