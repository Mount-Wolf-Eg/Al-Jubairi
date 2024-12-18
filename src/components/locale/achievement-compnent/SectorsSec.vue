<template>
  <div class="sector-sec">
    <p class="sectors-title">
      {{ props.secData.title }}
    </p>
    <p
      class="sectors-text body-desc-secondary"
      style="text-align: center !important"
    >
      {{ props.secData.desc }}
    </p>
    <div class="sectors-box container">
      <div class="row col-12 px-0 mx-auto d-flex justify-content-between gap-5">
        <div
          class="sector-info col-12 col-md p-0 mx-0 my-3"
          style="flex: 1"
          v-for="(item, i) in props.secData?.items?.data"
          :key="i"
        >
          <img :src="item.image?.media" :alt="item.image?.alt" />
          <div class="sector-hover-box">
            <div class="sector-box">
              <p class="sector-hover-title">{{ item.title }}</p>

              <button>
                <svg
                  style="width: 3.2rem; height: 3.2rem"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7607 24.0938L4.66741 16.0004L12.7607 7.90708"
                    stroke="white"
                    stroke-width="2.66667"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M27.333 16L4.89301 16"
                    stroke="white"
                    stroke-width="2.66667"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p class="sector-hover-body px-2 px-md-4">
              {{ item.desc }}
            </p>
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
