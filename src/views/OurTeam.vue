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
          class="px-5 px-md-0 d-flex flex-column flex-md-row gap-5 justify-content-between align-items-center flex-wrap"
        >
          <div
            class="employees"
            v-for="(item, i) in team_work.sections?.data[0]?.items?.data"
            :key="i"
            @click="$router.push({ name: 'Employee', params: { id: item.id } })"
          >
            <img
              loading="lazy"
              :src="item?.image?.media ?? logo"
              style="
                width: 23rem;
                height: 24.5rem;
                border-radius: 0.8rem;
                object-fit: contain;
                object-position: center;
                overflow: hidden;
              "
              :alt="item?.image?.alt"
            />
            <div class="employees-data">
              <p class="employees-name mb-2">
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
  <main v-else><SplashScreen /></main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import SplashScreen from "@/components/locale/custom-components/SplashScreen.vue";
import logo from "/src/assets/icons/logo.svg";

const crump = ref([{ name: "menu.team", rout: "/our-team" }]);

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
<style lang="scss" scoped>
html[dir="ltr"] .employees-data {
  transform: rotate(0) scaleY(0);
}
html[dir="ltr"] .employees-data {
  transform: rotate(180deg) scaleY(-1);
}

html[dir="ltr"] .employees-data {
  transform: rotate(0);
}
html[dir="rtl"] .employees-data {
  transform: rotate(0);
}
</style>
