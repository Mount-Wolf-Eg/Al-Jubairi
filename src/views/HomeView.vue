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
import { ref, onMounted, watch, defineAsyncComponent } from "vue";
import { useHead } from "@vueuse/head";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const GoogleAd = defineAsyncComponent(() =>
  import("@/components/GoogleAd.vue")
);
const heroSlider = defineAsyncComponent(() =>
  import("@/components/locale/home-component/heroSlider.vue")
);
const excellence = defineAsyncComponent(() =>
  import("@/components/locale/home-component/excellence.vue")
);
const AboutUs = defineAsyncComponent(() =>
  import("@/components/locale/home-component/AboutUs.vue")
);
const Support = defineAsyncComponent(() =>
  import("@/components/locale/home-component/Support.vue")
);
const Achievements = defineAsyncComponent(() =>
  import("@/components/locale/home-component/Achievements.vue")
);
const OurJourney = defineAsyncComponent(() =>
  import("@/components/locale/home-component/OurJourney.vue")
);
const LatestNews = defineAsyncComponent(() =>
  import("@/components/locale/home-component/LatestNews.vue")
);
const Questions = defineAsyncComponent(() =>
  import("@/components/locale/home-component/Questions.vue")
);
const OurClients = defineAsyncComponent(() =>
  import("@/components/locale/home-component/OurClients.vue")
);
const SocialData = defineAsyncComponent(() =>
  import("@/components/locale/custom-components/SocialData.vue")
);
const SplashScreen = defineAsyncComponent(() =>
  import("@/components/locale/custom-components/SplashScreen.vue")
);

// storee
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
          // { name: "og:image", content: newVal?.page?.data?.metadata.image },
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
