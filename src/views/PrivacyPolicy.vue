<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="privacy.page.data.title"
      :secDesc="privacy.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container px-5 px-md-0">
        <div class="privacy">
          <div
            class="html-content text-editor"
            v-html="
              privacy?.sections?.data[0]?.items?.data?.find(
                (el) => (el.id = 143)
              )?.desc
            "
          ></div>
        </div>
      </div>
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const crump = ref([{ name: "terms.terms", rout: "/privacy-policy" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
import { useHead } from "@vueuse/head";

const pageStore = usePageStore();
const { privacy } = storeToRefs(pageStore);

const isLoading = ref(true);

onMounted(async () => {
  if (
    !privacy.value ||
    !privacy.value.sections ||
    privacy.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("privacy");
  }
  isLoading.value = false;
});

watch(
  () => privacy.value,
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
