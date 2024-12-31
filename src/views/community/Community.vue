<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="community.page.data.title"
      :secDesc="community.page.data.desc"
    ></BreadCrump>
    <section class="inside-page d-flex justify-content-center">
      <div class="form-container">
        <h2 class="form-title">
          {{ $t("form.supporttitle") }}
        </h2>
        <p class="form-description">
          {{ $t("form.supportdesc") }}
        </p>
        <p class="form-description">
          {{ $t("form.fill") }}
        </p>
        <CommuntiyForm formType="community" />
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

const crump = ref([{ name: "menu.community", rout: "/community" }]);

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
watch(
  () => community.value,
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

<style lang="scss" src="./Community.scss"></style>
