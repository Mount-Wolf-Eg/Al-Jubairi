<template>
  <div class="legal">
    <p class="our-journey-sec--title head-secondary text-center">
      {{ props.secData.title }}
    </p>
    <div
      class="legal-expertise d-flex align-items-center justify-content-center flex-column flex-md-row gap-3 gap-md-0 mx-auto pt-5"
    >
      <div
        class="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3 gap-md-3"
        v-for="(item, i) in props.secData.items?.data?.slice(0, 3)"
        :key="i"
      >
        <img
          loading="lazy"
          style="max-height: 6.4rem; max-width: 9rem; height: 100%; width: auto"
          :src="item.image?.media"
          :alt="item.image?.alt"
        />
        <p class="expertise-text" v-html="item.desc">
          <!-- {{ item.desc }} -->
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
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
