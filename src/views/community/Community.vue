<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="community.page.data.title"
      :secDesc="community.page.data.desc"
    ></BreadCrump>
    <section class="inside-page d-flex justify-content-center">
      <div class="form-container">
        <h2 class="form-title">
          {{ $t("form.supporttitle") }}
        </h2>
        <p class="form-description">
          {{ $t("form.supportdesc") }}
        </p>
        <p class="form-description">
          {{ $t("form.fill") }}
        </p>
        <CommuntiyForm formType="community" />
      </div>
    </section>
  </main>
  <section v-else>Loading...</section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import CommuntiyForm from "@/reusables/forms/CommunityForm/CommuntiyForm.vue";

const crump = ref([{ name: "menu.community", rout: "/community" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { community } = storeToRefs(pageStore);
const isLoading = ref(true);
onMounted(async () => {
  if (
    !community.value ||
    !community.value.sections ||
    community.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("community");
  }

  isLoading.value = false;
});
</script>

<style lang="scss" src="./Community.scss"></style>
