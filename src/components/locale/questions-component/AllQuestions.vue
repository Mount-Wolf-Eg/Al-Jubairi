<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="singleSec?.title"
      :secDesc="singleSec?.desc"
    ></BreadCrump>

    <div class="inside-page">
      <div class="container">
        <div class="accordion" id="accordionExample">
          <div
            class="accordion-item"
            v-for="(item, i) in singleSec?.items?.data?.slice(
              0,
              numerOfQuestions
            )"
          >
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse${i}`"
                aria-expanded="true"
                :aria-controls="`collapse${i}`"
              >
                {{ item.title }}
              </button>
            </h2>
            <div
              :id="`collapse${i}`"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                {{ item.desc }}
              </div>
            </div>
          </div>
        </div>
        <button
          v-if="singleSec?.items?.data?.length > 5"
          class="read-more-btn my-3 my-md-5"
          @click="numerOfQuestions = singleSec?.items?.data?.length"
        >
          <p style="color: var(--col-dark)">اعرف المزيد</p>
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
const numerOfQuestions = ref(5);
const { singleSec } = storeToRefs(pageStore);

const data = ref("");

const crump = ref([{ name: data.value, rout: "/all-questions" }]);

const isLoading = ref(true);

watch(data, (newData) => {
  crump.value = [
    { name: "الأنجازات", rout: "/achievement" },
    { name: newData, rout: "/about" },
  ];
});

onMounted(async () => {
  await usePageStore().getSecData("freq_questions");
  if (singleSec.value.length == 0) router.push({ name: "home" });
  data.value = singleSec.value.title;
  console.log(singleSec.value);
  isLoading.value = false;
});

onBeforeUnmount(() => {
  singleSec.value = "";
});
</script>
