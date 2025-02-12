<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SplashScreen from "./components/locale/custom-components/SplashScreen.vue";
import MainLayout from "./components/global/layout/MainLayout.vue";
import moment from "moment";
import { useHead } from "@vueuse/head";
import { useSettingsStore } from "./stores/settingStore";

const route = useRoute();
const isLoading = ref(true);

// Load environment variables
const baseUrlEn =
  import.meta.env.VITE_BASE_URL_EN || "https://aljubairi.diaamagdi.com/en/";
const baseUrlAr =
  import.meta.env.VITE_BASE_URL_AR || "https://aljubairi.diaamagdi.com/ar/";

// Detect the current language from session storage or default to Arabic
const currentLang = sessionStorage.getItem("lang") || "ar";

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
  link: [
    { rel: "alternate", hreflang: "en", href: baseUrlEn },
    { rel: "alternate", hreflang: "ar", href: baseUrlAr },
    { rel: "alternate", hreflang: "x-default", href: baseUrlEn }, // Default to English
  ],
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
