<template>
  <main v-if="!isLoading" class="home-view">
    <GoogleAd />
    <heroSlider :secData="getSecData('slider')" />
    <excellence :secData="getSecData3('excellence')" />
    <AboutUs :secData="getSecData('more_about')" />
    <Support :secData="getSecData2('services')" />
    <Achievements />
    <OurJourney :secData="getSecData3('certificates')" />
    <LatestNews :secData="getSecData4('blogs')" />
    <Questions :secData="getSecData('freq_questions')" />
    <OurClients :secData="getSecData('clients')" />
    <SocialData />
  </main>
  <main v-else>
    <SplashScreen />
  </main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import GoogleAd from "@/components/GoogleAd.vue";
import heroSlider from "@/components/locale/home-component/heroSlider.vue";
import excellence from "@/components/locale/home-component/excellence.vue";
import AboutUs from "@/components/locale/home-component/AboutUs.vue";
import Support from "@/components/locale/home-component/Support.vue";
import Achievements from "@/components/locale/home-component/Achievements.vue";
import OurJourney from "@/components/locale/home-component/OurJourney.vue";
import LatestNews from "@/components/locale/home-component/LatestNews.vue";
import Questions from "@/components/locale/home-component/Questions.vue";
import OurClients from "@/components/locale/home-component/OurClients.vue";
import SocialData from "@/components/locale/custom-components/SocialData.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

// seo
import { useHead } from "@vueuse/head";

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { home, services, about, blogs } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (home.value && home.value.sections && home.value.sections.data) {
    const section = home.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};

const getSecData2 = (sectionType) => {
  if (
    services.value &&
    services.value.sections &&
    services.value.sections.data
  ) {
    const section = services.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};
const getSecData3 = (sectionType) => {
  if (about.value && about.value.sections && about.value.sections.data) {
    const section = about.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};
const getSecData4 = (sectionType) => {
  if (blogs.value && blogs.value.sections && blogs.value.sections.data) {
    const section = blogs.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};
onMounted(async () => {
  if (
    !home.value ||
    !home.value.sections ||
    home.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("home");
  }
  if (
    !services.value ||
    !services.value.sections ||
    services.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("services");
  }
  if (
    !about.value ||
    !about.value.sections ||
    about.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("about");
  }

  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("blogs");
  }
  isLoading.value = false;
});

watch(
  () => home.value,
  (newVal) => {
    if (newVal?.page?.data?.metadata) {
      console.log(newVal?.page?.data?.metadata);
      useHead({
        title: newVal?.page?.data?.metadata?.title,
        meta: [
          {
            name: "description",
            content: newVal?.page?.data?.metadata.description,
          },
          { name: "keywords", content: newVal?.page?.data?.metadata.keywords },
          { name: "og:title", content: newVal?.page?.data?.metadata.title },
          {
            name: "og:description",
            content: newVal?.page?.data?.metadata.description,
          },
          { name: "og:type", content: newVal?.page?.data?.metadata.type },
          { name: "og:image", content: newVal?.page?.data?.metadata.image },
          { name: "og:url", content: window.location.href },
          {
            name: "canonical",
            content: newVal?.page?.data?.metadata.canonical_tags,
          },
        ],
      });
    }
  },
  { immediate: true }
);
</script>
