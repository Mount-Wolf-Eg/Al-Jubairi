<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="blogs.page.data.title"
      :secDesc="blogs.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="row px-0 mx-2 mx-md-0 grid">
          <div
            class="blog-item col-12 p-0 mx-0 my-3"
            v-for="(item, i) in allItemsData"
            :key="i"
          >
            <div
              class="blog-content w-100"
              style="height: 50rem"
              @click="
                $router.push({
                  name: 'BlogDetail',
                  params: { blogName: 'blogInfo', id: item.id },
                })
              "
            >
              <div class="blog-img">
                <img
                  loading="lazy"
                  :src="item.image?.media"
                  style="height: 27rem; object-fit: contain"
                  :alt="item.image?.alt"
                />
              </div>
              <div class="blog-text p-4 pt-1">
                <p class="blog-date">
                  {{ moment(new Date(item.created_at)).format("LL") }}
                </p>
                <p class="blog-title">
                  {{ item.title }}
                </p>

                <div
                  class="html-content blog-desc text-editor"
                  v-html="item.desc"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="pagination-box d-flex justify-content-center align-items-center"
      >
        <vue-awesome-paginate
          :total-items="pagination?.total"
          v-model="currentPage"
          :items-per-page="pagination?.per_page"
          :max-pages-shown="5"
          :show-ending-buttons="false"
          :show-breakpoint-buttons="false"
          @click="onClickHandler"
        />
      </div>
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import moment from "moment";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const route = useRoute();
const router = useRouter();
const crump = ref([{ name: "menu.blog", rout: "/blogs" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
const pageStore = usePageStore();
import { storeToRefs } from "pinia";
const { blogs, pagination, allItemsData } = storeToRefs(pageStore);

const isLoading = ref(true);
// pagination data starts
const currentPage = ref(1);
const onClickHandler = async (page) => {
  router.push({
    path: route.path,
    query: {
      page: page,
    },
  });
  await pageStore.getAllItems("blogs", page);
};

onMounted(async () => {
  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("blogs");
  }
  await pageStore.getAllItems("blogs", route?.query?.page ?? 1);
  currentPage.value = pagination?.value?.current_page;
  isLoading.value = false;
});

watch(
  () => blogs.value,
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
<style lang="scss" scoped>
.blog-item {
  width: 38.4rem !important;
  height: 56.3rem !important;
}
</style>
