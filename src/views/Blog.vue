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
            v-for="(item, i) in blogs.sections.data[0]?.items?.data"
            :key="i"
          >
            <div
              class="blog-content w-100 h-100"
              @click="
                $router.push({ name: 'BlogDetail', params: { id: item.id } })
              "
            >
              <div class="blog-img">
                <img
                  :src="item.image?.media"
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                  "
                  :alt="item.image?.alt"
                />
              </div>
              <div class="blog-text p-4">
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
          :total-items="paginate.total"
          v-model="currentPage"
          :items-per-page="paginate.per_page"
          :max-pages-shown="5"
          :show-ending-buttons="true"
          :show-breakpoint-buttons="false"
          @click="onClickHandler"
        />
      </div>
    </div>
  </main>
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";

import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";

const crump = ref([{ name: "menu.blog", rout: "/blogs" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { blogs } = storeToRefs(pageStore);
const paginate = ref([]);
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
  await pageStore.getPageData("blogs", page);
};

onMounted(async () => {
  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("blogs");
  }
  isLoading.value = false;
  paginate.value = blogs.value?.sections?.pagination;
});
</script>
<style lang="scss" scoped>
.blog-item {
  width: 38.4rem !important;
  height: 56.3rem !important;
}
</style>
