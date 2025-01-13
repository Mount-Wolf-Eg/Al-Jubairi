<template>
  <main v-if="!isLoading" class="employee-view">
    <div class="container">
      <BreadCrump :crump="crump" :secTitle="''" :secDesc="''"></BreadCrump>

      <div class="row mx-0 px-3 px-md-0 gap-5">
        <div class="container p-0">
          <img
            loading="lazy"
            :src="singleItem.image?.media"
            style="
              width: 100%;
              height: auto;
              object-fit: cover;
              object-position: top;
              max-height: 60rem !important;
              border-radius: 0.8rem;
            "
            :alt="singleItem.image?.alt"
          />
        </div>
        <div class="col-12">
          <p class="main-date">
            {{ moment(new Date(singleItem.created_at)).format("LL") }}
          </p>
          <p class="employee-name head-secondary">
            {{ singleItem.title }}
          </p>

          <div class="html-content text-editor" v-html="singleItem.desc"></div>
        </div>
      </div>
    </div>
    <div class="more-blogs py-3 px-3 px-md-0">
      <div class="container">
        <h2 class="head-secondary more-blogs--title mt-3 mb-5">
          {{ $t("button.know-more") }}
        </h2>
        <div class="row gap-5 px-0 mx-2 mx-md-0">
          <div
            class="blog-item col-12 col-md p-0 mx-0 my-3"
            v-for="(item, i) in blogs.sections?.data[0]?.items?.data?.slice(
              0,
              2
            )"
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
                  v-html="item.desc?.slice(0, 300)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <button
          style="align-self: flex-start !important"
          class="read-more-btn py-3 py-md-5 px-5 px-md-0"
          @click="$router.push({ name: 'Blogs' })"
        >
          <p style="color: var(--col-dark) !important">
            {{ $t("button.show-all") }}
          </p>
          <div
            class="read-more-icon"
            style="background-color: var(--col-dark) !important"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                stroke="white"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 12L3.67 12"
                stroke="white"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </main>
  <div v-else class="container">Loading...</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePageStore } from "@/stores/pagesStore";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import { storeToRefs } from "pinia";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

const route = useRoute();
const router = useRouter();
const { singleItem, blogs } = storeToRefs(usePageStore());
const isLoading = ref(true);
const data = ref("");

const crump = ref([
  { name: "menu.blog", rout: "/blogs" },
  { name: "menu.blog-name", rout: "" },
]);

watch(data, (newData) => {
  crump.value = [
    { name: "menu.blog", rout: "/blogs" },
    { name: newData, rout: "/about" },
  ];
});

onMounted(async () => {
  if (!route.params.id) router.push({ name: "Blogs" });
  await usePageStore().getItemData(route.params.id);

  if (singleItem.value.length == 0) router.push({ name: "Blogs" });

  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await usePageStore().getPageData("blogs");
  }
  data.value = singleItem.value.title;

  isLoading.value = false;
});
onBeforeUnmount(() => {
  singleItem.value = "";
});

watch(
  () => route.params.id,
  (newVal) => {
    window.location.reload();
  }
);
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

<style lang="scss" scoped></style>
