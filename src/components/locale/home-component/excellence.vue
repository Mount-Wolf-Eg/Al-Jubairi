<template>
  <div
    class="legal-expertise d-flex align-items-center justify-content-center flex-column flex-md-row gap-3 gap-md-0 mx-auto"
  >
    <div
      v-if="props.secData.items?.data?.length"
      class="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3 gap-md-3"
      v-for="(item, i) in props.secData.items?.data?.slice(0, 3)"
      :key="i"
    >
      <img
        loading="lazy"
        width="144"
        height="102"
        style="max-height: 6.4rem; max-width: 9rem"
        :src="item.image?.media"
        :alt="item.image?.alt"
      />
      <p class="expertise-text">
        {{ item.desc }}
      </p>
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
