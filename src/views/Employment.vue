<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="jobs?.page?.data?.title"
      :secDesc="jobs?.page?.data?.desc"
    ></BreadCrump>
    <section class="inside-page d-flex justify-content-center">
      <div class="form-container">
        <h2 class="form-title">تقدم بطلبك</h2>
        <p class="form-description">
          يرجى ملء النموذج أدناه للحصول على فرصة للإنضمام إلى فريقنا القانوني.
        </p>
        <CommuntiyForm formType="employment" />
      </div>
    </section>
  </main>
  <section v-else>Loading...</section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import CommuntiyForm from "@/reusables/forms/CommunityForm/CommuntiyForm.vue";

const crump = ref([{ name: "التوظيف", rout: "/employment" }]);

// store
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();
const { jobs } = storeToRefs(pageStore);
const isLoading = ref(true);
onMounted(async () => {
  if (
    !jobs.value ||
    !jobs.value.sections ||
    jobs.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("jobs");
  }

  isLoading.value = false;
});
</script>

<style lang="scss">
@import "./community/Community.scss"; // You can keep the same styles
</style>
