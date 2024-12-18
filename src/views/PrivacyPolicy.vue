<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="privacy.page.data.title"
      :secDesc="privacy.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="privacy">
          <div
            class="html-content text-editor"
            v-html="privacy?.sections?.data[0].items.data.desc"
          ></div>
        </div>
      </div>
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted } from "vue";

import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const crump = ref([{ name: "terms.conditions", rout: "/privacy-policy" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { privacy } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (privacy.value && privacy.value.sections && privacy.value.sections.data) {
    const section = privacy.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};

onMounted(async () => {
  if (
    !privacy.value ||
    !privacy.value.sections ||
    privacy.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("privacy");
  }
  console.log(privacy);
  isLoading.value = false;
});
</script>
