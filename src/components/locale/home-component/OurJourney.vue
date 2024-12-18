<template>
  <div class="our-journey-sec">
    <p class="our-journey-sec--title head-secondary text-center">
      {{ props.secData.title }}
    </p>
    <div
      class="our-journey-helpers container flx-r flex-wrap justify-content-center justify-content-start align-items-center"
    >
      <div
        class="sv-box"
        v-for="(item, i) in props.secData.items?.data?.slice(0, 6)"
        :key="i"
      >
        <img
          loading="lazy"
          :src="item.image?.media"
          style="
            max-width: 9rem;
            max-height: 11.6rem;
            width: auto;
            height: 100%;
            object-fit: contain;
            object-position: center;
          "
          :alt="item.image?.alt"
        />
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
