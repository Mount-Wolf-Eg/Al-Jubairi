<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="achievement.page.data.title"
      :secDesc="achievement.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <AchieveSec :secData="getSecData('achievement')" />
      <Achievements :secData="getSecData('achievement_statistics')" />
      <SectorsSec :secData="getSecData('sectors')" />
      <OurClients :secData="getSecData2('clients')" />
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import AchieveSec from "@/components/locale/achievement-compnent/AchieveSec.vue";
import Achievements from "@/components/locale/achievement-compnent/Achievements.vue";
import SectorsSec from "@/components/locale/achievement-compnent/SectorsSec.vue";
import OurClients from "@/components/locale/achievement-compnent/OurClients.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const crump = ref([{ name: "menu.achievements", rout: "/achievement" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { achievement, home } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (
    achievement.value &&
    achievement.value.sections &&
    achievement.value.sections.data
  ) {
    const section = achievement.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};
const getSecData2 = (sectionType) => {
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
    !achievement.value ||
    !achievement.value.sections ||
    achievement.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("achievement");
  }

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
