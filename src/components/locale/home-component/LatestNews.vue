<template>
  <div class="latest-news-sec container ">
    <p class="latest-news-sec--title head-secondary text-center">
      {{ props.secData.title }}
    </p>
    <div
      class="latest-news-box d-flex flex-column flex-md-row justify-content-between align-items-start gap-5 px-5 px-md-0">
      <div style="flex: 0.5; border-radius: 0.8rem; overflow: hidden"
        class="flex-r w-100 align-items-center justify-content-center ">
        <!-- <img loading="lazy" :src="props.secData?.items?.data?.slice(-1)[0]?.image?.media" 
        style="
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center;
          " :alt="props.secData?.items?.data?.slice(-1)[0]?.image?.alt" /> -->
          <img 
  loading="lazy" 
  :src="props.secData?.items?.data?.slice(-1)[0]?.image?.media"
  :alt="props.secData?.items?.data?.slice(-1)[0]?.image?.alt"
  :width="props.secData?.items?.data?.slice(-1)[0]?.image?.width || 800" 
  :height="props.secData?.items?.data?.slice(-1)[0]?.image?.height || 450"
  style="
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  "
/>
      </div>
      <div class="latest-news-text mt-auto flx-c align-items-start justify-content-end" style="flex: 1">
        <p class="date">
          {{
            moment(
              new Date(props.secData?.items?.data?.slice(-1)[0]?.created_at)
            ).format("LL")
          }}
        </p>
        <p class="latest-news-text--title">
          {{ props.secData?.items?.data?.slice(-1)[0]?.title }}
        </p>
        <p class="latest-news-text--parag">
        <div class="html-content text-editor" v-html="props.secData?.items?.data?.slice(-1)[0]?.desc?.slice(0, 500)">
        </div>
        </p>
        <button @click="
          $router.push({ name: 'BlogDetail', params: {blogName: 'blogInfo', id: props.secData?.items?.data?.slice(-1)[0]?.id } })
          " class="latest-news--link">{{ $t("button.know-more") }}</button>
      </div>
    </div>
    <button style="align-self: flex-start !important" class="read-more-btn py-3 py-md-5 px-5 px-md-0"
      @click="$router.push({ name: 'Blogs' })">
      <p style="color: var(--col-dark) !important">
        {{ $t("button.show-all") }}
      </p>
      <div class="read-more-icon" style="background-color: var(--col-dark) !important">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.57031 18.07L3.50031 12L9.57031 5.93001" stroke="white" stroke-width="2" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.5 12L3.67 12" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import { onMounted, watch, ref, onBeforeMount } from "vue";
//moment
import moment from "moment";
 


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
