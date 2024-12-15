<template>
  <div
    class="legal-expertise d-flex align-items-center justify-content-center flex-column flex-md-row gap-5 gap-md-0 mx-auto"
  >
    <div
      class="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3 gap-md-5"
      v-for="(item, i) in props.secData.items?.data?.slice(0, 3)"
      :key="i"
    >
      <img
        style="max-width: 6.4rem; max-height: 6.4rem; width: 100%; height: auto"
        :src="item.image.media"
        :alt="item.image.alt"
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
