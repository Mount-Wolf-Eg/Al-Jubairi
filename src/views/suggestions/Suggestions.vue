<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="suggestions?.page?.data?.title"
      :secDesc="suggestions?.page?.data?.desc"
    ></BreadCrump>
    <section class="inside-page">
      <div class="container contact-page">
        <div class="form-container mx-auto">
          <CommuntiyForm formType="suggest" />
        </div>
      </div>
    </section>
  </main>
  <section v-else>Loading...</section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useHead } from "@vueuse/head";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import CommuntiyForm from "@/reusables/forms/CommunityForm/CommuntiyForm.vue";
import { useSettingsStore } from "@/stores/settingStore";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const crump = ref([{ name: "terms.suggest", rout: "/suggestions-complaints" }]);
const pageStore = usePageStore();
const settingsStore = useSettingsStore();
const { suggestions } = storeToRefs(pageStore);
const { settings } = storeToRefs(settingsStore);

const isLoading = ref(true);

onMounted(async () => {
  if (
    !suggestions.value ||
    !suggestions.value.sections ||
    suggestions.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("suggestions");
  }

  await settingsStore.getSettings();
  isLoading.value = false;
});

watch(
  () => suggestions.value,
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

<style lang="scss" src="./Contact.scss"></style>
