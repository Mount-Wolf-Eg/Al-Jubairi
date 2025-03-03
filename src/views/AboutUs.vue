<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="about.page.data.title"
      :secDesc="about.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <AboutUsInfo :secData="getSecData('more_about')" />
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import AboutUsInfo from "@/components/locale/about-component/AboutUsInfo.vue";
import Achievements from "@/components/locale/about-component/Achievements.vue";
import excellence from "@/components/locale/about-component/excellence.vue";
import OurJourney from "@/components/locale/about-component/OurJourney.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";
import { useHead } from "@vueuse/head";

const crump = ref([{ name: "menu.about-jubairi", rout: "/about" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
import { POSITION } from "vue-toastification";
const pageStore = usePageStore();
const { about } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (about.value && about.value.sections && about.value.sections.data) {
    const section = about.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};

onMounted(async () => {
  if (
    !about.value ||
    !about.value.sections ||
    about.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("about");
  }

  isLoading.value = false;
});
watch(
  () => about.value,
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
