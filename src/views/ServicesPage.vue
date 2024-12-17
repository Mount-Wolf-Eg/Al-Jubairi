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
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import Support from "@/components/locale/service-component/Support.vue";

const crump = ref([{ name: "خدماتنا", rout: "/services" }]);

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
</script>
