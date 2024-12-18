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
              <img
                :src="item.image?.media"
                class="service-card--img"
                :Lalt="item.image?.alt"
              />
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
// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const pageStore = usePageStore();
const { singleItem } = storeToRefs(pageStore);

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
  isLoading.value = false;
});

onBeforeUnmount(() => {
  singleItem.value = "";
});
</script>
