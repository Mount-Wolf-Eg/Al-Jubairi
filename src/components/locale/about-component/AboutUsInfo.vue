<template>
  <div class="about-us-info">
    <div class="container px-0">
      <img
        loading="lazy"
        style="
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center;
          max-height: 50.8rem;
        "
        :src="secData.items.data[0].image.media"
        :alt="secData.items.data[0].image.alt"
      />
      <div class="about-info--box row gap-0 gap-md-5 mx-3 mx-md-0">
        <div class="col-12 col-md-4">
          <p class="about-info--title head-secondary">
            {{ secData.items.data[0].title }}
          </p>
        </div>
        <div class="col-12 col-md mx-0">
          <div
            class="html-content text-editor"
            v-html="secData.items.data[0].desc"
          ></div>
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
