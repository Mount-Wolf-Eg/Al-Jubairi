<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="achievement.page.data.title"
      :secDesc="achievement.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <AchieveSec :secData="getSecData('achievement')" />
    </div>
  </main>
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import AchieveSec from "@/components/locale/achievement-compnent/AchieveSec.vue";

const crump = ref([{ name: "الأنجازات", rout: "/achievement" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { achievement } = storeToRefs(pageStore);

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

onMounted(async () => {
  if (
    !achievement.value ||
    !achievement.value.sections ||
    achievement.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("achievement");
  }
  isLoading.value = false;
});
</script>
