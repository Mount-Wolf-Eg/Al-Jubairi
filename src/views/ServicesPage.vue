<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="services.page.data.title"
      :secDesc="services.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <Support :secData="getSecData('services')" />
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import Support from "@/components/locale/service-component/Support.vue";
import { useHead } from "@vueuse/head";

const crump = ref([{ name: "menu.services", rout: "/services" }]);
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { services } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
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

onMounted(async () => {
  if (
    !services.value ||
    !services.value.sections ||
    services.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("services");
  }
  isLoading.value = false;
});
watch(
  () => services.value,
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
