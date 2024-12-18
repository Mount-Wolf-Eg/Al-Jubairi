<template>
  <main v-if="!isLoading" class="employee-view">
    <div class="container">
      <BreadCrump :crump="crump" :secTitle="''" :secDesc="''"></BreadCrump>

      <div class="row mx-0 px-3 px-md-0 gap-5">
        <div class="col-6 col-md-3 mx-auto mx-md-0">
          <img
            loading="lazy"
            :src="singleItem.image?.media"
            style="
              width: 100%;
              height: auto;
              object-fit: contain;
              object-position: center;
              max-width: 30rem;
              filter: saturate(0);
            "
            :alt="singleItem.image?.alt"
          />
        </div>
        <div class="col-12 col-md-3">
          <p class="employee-name">
            {{ singleItem.name }}
          </p>
          <p class="employee-title">
            {{ singleItem.title }}
          </p>
          <div class="html-content text-editor" v-html="singleItem.desc"></div>
        </div>
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
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { singleItem } = storeToRefs(usePageStore());
const isLoading = ref(true);
const data = ref("");

const crump = ref([
  { name: "menu.team", rout: "/our-team" },
  { name: "menu.lawyer-name", rout: "" },
]);

watch(data, (newData) => {
  crump.value = [
    { name: "menu.team", rout: "/our-team" },
    { name: newData, rout: "" },
  ];
});

onMounted(async () => {
  if (!route.params.id) router.push({ name: "our-team" });
  await usePageStore().getItemData(route.params.id);
  if (singleItem.value.length == 0) router.push({ name: "our-team" });
  data.value = singleItem.value.title;
  isLoading.value = false;
});
onBeforeUnmount(() => {
  singleItem.value = "";
});
</script>

<style lang="scss" scoped></style>
