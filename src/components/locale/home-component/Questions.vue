<template>
  <div class="questions-sec px-3">
    <p class="questions-sec--title head-secondary text-center">
      {{ props.secData.title }}
    </p>
    <div class="container">
      <div class="accordion" id="accordionExample">
        <div
          class="accordion-item"
          v-for="(item, i) in props.secData.items?.data?.slice(0, 3)"
          :key="i"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse${i}`"
              aria-expanded="false"
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
            <div
              class="accordion-body"
              style="position: relative"
              v-html="item.desc"
            ></div>
          </div>
        </div>
      </div>
      <button
        class="read-more-btn my-3 my-md-5"
        @click="$router.push({ name: 'Questions' })"
      >
        <p style="color: var(--col-dark)">{{ $t("button.know-more") }}</p>
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
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useHead } from "@vueuse/head";

const props = defineProps({
  secData: {
    type: Object,
    default: () => ({}),
    required: false,
  },
});

const faqSchema = computed(() => {
  if (!props.secData.items?.data) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: props?.secData?.items.data.slice(0, 3).map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.desc.replace(/(<([^>]+)>)/gi, ""),
      },
    })),
  };
});

watchEffect(() => {
  if (faqSchema.value) {
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema.value),
        },
      ],
    });
  }
});
</script>

<style lang="scss" scoped></style>
