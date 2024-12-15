<template>
  <main v-if="!isLoading">
    <heroSlider
      :secData="getSecData('slider')"
      :secData2="getSecData('excellence')"
    />
    <excellence :secData="getSecData('excellence')" />
    <AboutUs :secData="getSecData('more_about')" />
    <Support :secData="getSecData('services')" />
    <Achievements />
    <OurJourney :secData="getSecData('certificates')" />
    <LatestNews :secData="getSecData('last_news')" />
    <Questions :secData="getSecData('freq_questions')" />
    <OurClients :secData="getSecData('clients')" />
  </main>
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import heroSlider from "@/components/locale/home-component/heroSlider.vue";
import excellence from "@/components/locale/home-component/excellence.vue";
import AboutUs from "@/components/locale/home-component/AboutUs.vue";
import Support from "@/components/locale/home-component/Support.vue";
import Achievements from "@/components/locale/home-component/Achievements.vue";
import OurJourney from "@/components/locale/home-component/OurJourney.vue";
import LatestNews from "@/components/locale/home-component/LatestNews.vue";
import Questions from "@/components/locale/home-component/Questions.vue";
import OurClients from "@/components/locale/home-component/OurClients.vue";

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { home } = storeToRefs(pageStore);

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

onMounted(async () => {
  if (
    !home.value ||
    !home.value.sections ||
    home.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("home");
  }
  isLoading.value = false;
});
</script>
