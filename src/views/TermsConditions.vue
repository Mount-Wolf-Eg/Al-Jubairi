<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="terms.page.data.title"
      :secDesc="terms.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="terms">
          <div
            class="html-content text-editor"
            v-html="terms?.sections?.data[0].items.data.desc"
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

const crump = ref([{ name: "terms.terms", rout: "/terms-conditions" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { terms } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (terms.value && terms.value.sections && terms.value.sections.data) {
    const section = terms.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};

onMounted(async () => {
  if (
    !terms.value ||
    !terms.value.sections ||
    terms.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("terms");
  }
  console.log(terms);
  isLoading.value = false;
});
</script>
