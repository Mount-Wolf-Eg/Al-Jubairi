<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="blogs.page.data.title"
      :secDesc="blogs.page.data.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="row gap-5 px-0 mx-2 mx-md-0">
          <div
            class="blog-item col-12 col-md p-0 mx-0 my-3"
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
                    object-position: center;
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

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (blogs.value && blogs.value.sections && blogs.value.sections.data) {
    const section = blogs.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
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
});
</script>
