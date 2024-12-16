<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="community.page.data.title"
      :secDesc="community.page.data.desc"
    ></BreadCrump>
    <div class="inside-page"></div>
  </main>
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
const crump = ref([{ name: "المجتمع", rout: "/community" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { community } = storeToRefs(pageStore);
const isLoading = ref(true);
onMounted(async () => {
  if (
    !community.value ||
    !community.value.sections ||
    community.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("community");
  }

  isLoading.value = false;
});
</script>
