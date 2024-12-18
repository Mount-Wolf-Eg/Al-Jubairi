<template>
  <div class="achieve-page-sec">
    <div class="container px-0">
      <div
        class="row mx-0 px-3 px-md-0 d-flex align-items-start justify-content-between flex-column flex-md-row gap-5 gap-md-0"
      >
        <div class="col-12 col-md-5 achieve-box px-0 px-md-3">
          <p class="achieve-sec-title head-secondary">
            {{ secData?.title }}
          </p>
          <p class="achieve-sec-body body-desc-tertiary">
            {{ secData?.desc }}
          </p>
        </div>
        <div class="col-12 col-md-6 p-0">
          <div v-for="(item, i) in secData?.items?.data" :key="i">
            <div class="achieve p-2 p-md-5">
              <img
                style="
                  width: 12rem;
                  height: auto;
                  object-fit: contain;
                  object-position: center;
                "
                :src="item.image?.media"
                :alt="item.image?.alt"
              />

              <p class="achieve-title">
                {{ item.title }}
              </p>
              <p class="achieve-desc">
                {{ item.desc }}
              </p>
              <button
                @click="
                  $router.push({ name: 'AchieveData', params: { id: item.id } })
                "
                class="read-more-btn my-3 my-md-5"
                v-if="item.has_items"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps({
  secData: {
    type: Object,
    default: () => {
      return {};
    },
    Required: false,
  },
});
</script>

<style lang="scss" scoped></style>
