<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="blogs.page.data.title"
      :secDesc="blogs.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div
          class="d-flex align-items-center justify-content-center flex-wrap flex-md-nowrap gap-0 gap-md-5"
        >
          <category
            v-model="categ"
            @parentId="getChildBlogs($event)"
          ></category>
          <SearchInput
            :selected="{
              page: 'blogs',
              routeName: 'BlogDetail',
              slug: 'blogInfo',
            }"
            v-model="keyword"
          ></SearchInput>
        </div>
        <div class="row px-0 mx-2 mx-md-0 grid" v-if="childItems.length">
          <div
            class="blog-item col-12 p-0 mx-0 my-3"
            v-for="(item, i) in childItems"
            :key="i"
          >
            <div
              class="blog-content w-100"
              style="height: 50rem"
              @click="
                $router.push({
                  name: 'BlogDetail',

                  params: {
                    blogName: encodeURIComponent(item.slug || 'blogInfo'),
                    id: item.id,
                  },
                })
              "
            >
              <div class="blog-img border">
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
        <div v-else class="alert alert-warning" role="alert">
          ⚠️{{ $t("search.noData") }}
        </div>
      </div>
      <div
        class="pagination-box d-flex justify-content-center align-items-center"
      >
        <vue-awesome-paginate
          :total-items="childPagination?.total ?? 1"
          v-model="currentPage"
          :items-per-page="childPagination?.per_page"
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
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchInput from "@/reusables/search/SearchInput.vue";
import { useHead } from "@vueuse/head";
import moment from "moment";
import category from "@/components/locale/blog-component/category.vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const route = useRoute();
const router = useRouter();
const crump = ref([{ name: "menu.blog", rout: "/blogs" }]);
const keyword = ref("");
const categ = ref("");

// store
import { usePageStore } from "@/stores/pagesStore";
const pageStore = usePageStore();
import { storeToRefs } from "pinia";
const { blogs, childPagination, singleItem, childItems } =
  storeToRefs(pageStore);

const isLoading = ref(true);
const currentPage = ref(1);
const onClickHandler = async (page) => {
  router.push({
    path: route.path,
    query: {
      page: page,
    },
  });
  await pageStore.getChildItems("blogs", page);
};

onMounted(async () => {
  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("blogs");
  }
  // await pageStore.getAllItems("blogs", route?.query?.page ?? 1);
  await pageStore.getChildItems("blogs");
  currentPage.value = childPagination?.value?.current_page ?? 1;
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
const getChildBlogs = async (id) => {
  if (id) {
    await pageStore.getItemData(id);
    childItems.value = singleItem.value?.items;
  } else {
    await pageStore.getChildItems("blogs");
  }
};
</script>

<style lang="scss" scoped>
.blog-item {
  width: 38.4rem !important;
  height: 56.3rem !important;
}
</style>
