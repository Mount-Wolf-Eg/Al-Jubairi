<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="team_work.page.data.title"
      :secDesc="team_work.page.data.desc"
    ></BreadCrump>
    <div class="inside-page">
      <div class="container">
        <div
          class="px-5 px-md-0 d-flex flex-column flex-md-row gap-5 justify-content-between align-items-center"
        >
          <div
            class="employees"
            v-for="(item, i) in team_work.sections?.data[0]?.items?.data"
            :key="i"
            @click="$router.push(`/employee-data/${item.id}`)"
          >
            <img
              :src="item?.image?.media"
              style="
                width: 100%;
                height: auto;
                object-fit: contain;
                object-position: center;
              "
              :alt="item?.image?.alt"
            />
            <div class="employees-data">
              <p class="employees-name">
                {{ item.name }}
              </p>
              <p class="employees-title">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div v-else>Loading...</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";

const crump = ref([{ name: "فريق العمل", rout: "/our-team" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { team_work } = storeToRefs(pageStore);

const isLoading = ref(true);

const getSecData = (sectionType) => {
  if (
    team_work.value &&
    team_work.value.sections &&
    team_work.value.sections.data
  ) {
    const section = team_work.value.sections.data.find(
      (sec) => sec.type === sectionType
    );
    return section ? section : {};
  }
  return {};
};

onMounted(async () => {
  if (
    !team_work.value ||
    !team_work.value.sections ||
    team_work.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("team_work");
  }

  isLoading.value = false;
});
</script>
