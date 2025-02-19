<template>
  <main v-if="!isLoading" class="employee-view">
    <BreadCrump :crump="crump" :secTitle="''" :secDesc="''"></BreadCrump>
    <div class="container">
      <div class="row mx-0 px-3 px-md-0 gap-2 gap-md-5">
        <div class="container p-0">
          <img
            loading="lazy"
            :src="singleItem.image?.media"
            style="
              object-fit: contain;
              max-height: 81rem !important;
              border-radius: 0.8rem;
              width: 100% !important;
            "
            class="mx-auto"
            :alt="singleItem.image?.alt"
          />
        </div>
        <div class="col-1 col-md-2" style="position: relative">
          <div
            id="navbar-example3"
            class="h-auto flex-row align-items-stretch border-end w-100"
            style="position: sticky; top: 100px; right: 0"
          >
            <div class="nav nav-pills flex-column">
              <a
                v-for="(item, i) in scrollSpy"
                :key="i"
                :href="`#${Object.keys(item)[0]}`"
                class="spy-link"
                style="word-break: break-all"
                :class="`spy-${Object.keys(item)[0]}`"
              >
                <span class="d-none d-md-block">
                  {{ item[Object.keys(item)[0]] }}
                </span>
                <span class="d-block d-md-none">{{ i }}</span>
              </a>

              <a class="spy-link" href="#see-more">
                <span class="d-none d-md-block">
                  {{ $t("button.know-more") }}
                </span>
                <span class="d-block d-md-none">&#x2193;</span>
              </a>
            </div>
          </div>
        </div>
        <div
          class="col scrollspy-example-2"
          style="word-break: break-all"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example3"
          data-bs-smooth-scroll="true"
          tabindex="0"
        >
          <p class="main-date">
            {{ moment(new Date(singleItem.created_at)).format("LL") }}
          </p>
          <h2 class="employee-name head-secondary">
            {{ singleItem.title }}
          </h2>

          <div class="html-content text-editor" v-html="singleItem.desc"></div>
        </div>
      </div>
    </div>

    <!-- more blogs -->

    <div class="more-blogs py-3 px-3 px-md-0" id="see-more">
      <div class="container">
        <h2 class="head-secondary more-blogs--title mt-3 mb-5">
          {{ $t("button.know-more") }}
        </h2>
        <div class="row gap-5 px-0 mx-2 mx-md-0">
          <div
            class="blog-item col-12 col-md p-0 mx-0 my-3"
            v-for="(item, i) in childItems?.slice(0, 2)"
            :key="i"
          >
            <div
              class="blog-content w-100 h-100"
              @click="
                $router.push({
                  name: 'BlogDetail',
                  params: { blogName: 'blog-info', id: item.id },
                })
              "
            >
              <div class="blog-img">
                <img
                  loading="lazy"
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
              <div class="blog-text p-4 pt-1">
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
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

const route = useRoute();
const router = useRouter();
const { singleItem, blogs, childItems } = storeToRefs(usePageStore());
const isLoading = ref(true);
const data = ref("");
const scrollSpy = ref([]);

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
let observer;

onMounted(async () => {
  if (!route.params.id) {
    router.push({ name: "Blogs" });
    return;
  }

  await usePageStore().getItemData(route.params.id);

  if (!singleItem.value || singleItem.value.length === 0) {
    router.push({ name: "Blogs" });
    return;
  }

  if (
    !blogs.value ||
    !blogs.value.sections ||
    blogs.value.sections.data.length === 0
  ) {
    await usePageStore().getPageData("blogs");
  }
  await usePageStore().getChildItems("blogs");

  data.value = singleItem.value.title;
  isLoading.value = false;

  await nextTick();

  let headings = document.querySelectorAll(
    ".scrollspy-example-2 h2, .scrollspy-example-2 h3, .scrollspy-example-2 h4, .scrollspy-example-2 h5, .scrollspy-example-2 h6"
  );
  scrollSpy.value = [];
  let first = 0;
  let headingsArray = Array.from(headings);

  headingsArray.forEach((el) => {
    el.id = `item${first++}`;
    const headingText = el.innerHTML;
    const strongText = el.querySelector("strong");
    if (strongText) {
      scrollSpy.value.push({ [el.id]: strongText.innerHTML });
    } else {
      scrollSpy.value.push({ [el.id]: headingText });
    }
  });

  observer = new IntersectionObserver(
    (entries) => {
      let lastVisibleEntry = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          lastVisibleEntry = entry;
        }
      });

      if (lastVisibleEntry) {
        document.querySelectorAll(".spy-link").forEach((link) => {
          link.classList.remove("active-spy");
        });

        const activeLink = document.querySelector(
          `.spy-${lastVisibleEntry.target.id}`
        );
        if (activeLink) {
          activeLink.classList.add("active-spy");
        }
      }
    },
    {
      threshold: 0.7,
    }
  );

  // Observe each heading
  headingsArray.forEach((heading) => {
    observer.observe(heading);
  });
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
onBeforeUnmount(() => {
  singleItem.value = "";
  if (observer) {
    observer.disconnect(); // Clean up the observer
  }
});
</script>

<style lang="scss" scoped>
.spy-link {
  padding: 0.5rem;
  font-size: var(--fs-12);
  font-weight: bold;
}
.active-spy {
  color: #000 !important;
  background-color: #ddd !important; // Change the background color for active state
  font-weight: bold;
}
</style>
