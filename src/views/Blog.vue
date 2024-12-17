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
            v-for="(item, i) in blogs.sections.data[0].items.data"
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
                  :src="item.image.media"
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                  "
                  :alt="item.image.alt"
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
        class="d-flex justify-content-center align-items-center"
        aria-label="Page navigation example"
      >
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="text-danger page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item">
            <a class="text-danger page-link" href="#">1</a>
          </li>
          <li class="page-item active">
            <a class="text-danger page-link" href="#"
              >2 <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="page-item">
            <a class="text-danger page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="text-danger page-link" href="#">Next</a>
          </li>
        </ul>
      </div>
      <button @click="goTO()" class="">got ot</button>
      {{ blogs.sections.data[0].items.pagination }}
    </div>
  </main>
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";

import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";

const crump = ref([{ name: "المدونة", rout: "/blogs" }]);

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
  console.log(blogs.value.sections.data[0].items.pagination);

  isLoading.value = false;
});

const goTO = async () => {
  await pageStore.getPageData("blogs", "2");
};
</script>
<style lang="scss" scoped>
.pagination {
  li {
    color: black;
  }
}
</style>
