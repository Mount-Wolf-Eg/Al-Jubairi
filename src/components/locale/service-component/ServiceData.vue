<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="singleItem?.title"
      :secDesc="singleItem?.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="row px-0 mx-2 mx-md-auto">
          <div
            v-for="(item, i) in singleItem?.items"
            :key="i"
            class="service-card col-6 col-md-3 my-3 mx-auto"
          >
            <div
              class="d-flex flex-column align-items-center gap-3 justify-content-between h-100 p-4"
            >
              <div
                class="w-100 h-75 d-flex align-items-center justify-content-center"
              >
                <img
                  :src="item.image?.media"
                  class="service-card--img"
                  :Lalt="item.image?.alt"
                />
              </div>
              <div class="text-center">
                <p class="service-card--title">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const pageStore = usePageStore();
const { singleItem, services } = storeToRefs(pageStore);

const data = ref("");

const crump = ref([
  { name: "menu.achievements", rout: "/achievement" },
  { name: data.value, rout: "/about" },
]);

const isLoading = ref(true);

watch(data, (newData) => {
  crump.value = [
    { name: "menu.achievements", rout: "/achievement" },
    { name: newData, rout: "/about" },
  ];
});

onMounted(async () => {
  if (!route.params.id) router.push({ name: "Achievement" });
  await usePageStore().getItemData(route.params.id);
  if (singleItem.value.length == 0) router.push({ name: "Achievement" });
  data.value = singleItem.value.title;
  if (
    !services.value ||
    !services.value.sections ||
    services.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("services");
  }
  isLoading.value = false;
});

onBeforeUnmount(() => {
  singleItem.value = "";
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
