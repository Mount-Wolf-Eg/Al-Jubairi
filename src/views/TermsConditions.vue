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
            v-html="
              terms?.sections?.data[0]?.items?.data?.find((el) => (el.id = 148))
                ?.desc
            "
          ></div>
          <!-- v-html="terms?.sections?.data[0].items.data.desc" -->
        </div>
      </div>
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useHead } from "@vueuse/head";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const crump = ref([{ name: "terms.terms", rout: "/terms-conditions" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { terms } = storeToRefs(pageStore);

const isLoading = ref(true);

onMounted(async () => {
  if (
    !terms.value ||
    !terms.value.sections ||
    terms.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("terms");
  }

  isLoading.value = false;
});

watch(
  () => terms.value,
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
