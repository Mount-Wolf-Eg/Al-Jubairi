<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="jobs?.page?.data?.title"
      :secDesc="jobs?.page?.data?.desc"
    ></BreadCrump>
    <section class="inside-page d-flex justify-content-center">
      <div class="form-container px-4 px-md-5">
        <h2 class="form-title">{{ $t("form.submit-application") }}</h2>
        <p class="form-description">
          {{ $t("form.fil-below") }}
        </p>
        <CommuntiyForm formType="employment" />
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

const crump = ref([{ name: "menu.employment", rout: "/employment" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { jobs } = storeToRefs(pageStore);
const isLoading = ref(true);
onMounted(async () => {
  if (
    !jobs.value ||
    !jobs.value.sections ||
    jobs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("jobs");
  }

  isLoading.value = false;
});

watch(
  () => jobs.value,
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

<style lang="scss" src="./community/Community.scss"></style>
