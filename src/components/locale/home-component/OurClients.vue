<template>
  <div class="our-clients container">
    <p class="our-clients--title">
      {{ props.secData.title }}
    </p>
    <p
      class="our-clients--text body-desc-secondary"
      style="text-align: center !important"
    >
      {{ props.secData.desc }}
    </p>
    <div class="clients">
      <swiper
        :autoplay="{
          delay: 1000,
          disableOnInteraction: false,
        }"
        class="w-100 h-100"
        :modules="modules"
        :pagination="{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        }"
        :slides-per-view="1"
        :Autoplay="{
          delay: 1000,
          disableOnInteraction: true,
          waitForTransition: true,
        }"
        :space-between="10"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :preload-images="false"
        :breakpoints="breakpoints"
        :Lazy="true"
      >
        {{ props.secData }}
        <swiper-slide v-for="(slide, i) in props.secData?.items?.data" :key="i">
          <div class="tetimonial-card mx-auto w-100 h-100">
            <div
              class="d-flex justify-content-center align-items-center"
              style="width: 23.6rem; height: 12rem"
            >
              <img
                loading="lazy"
                :src="slide.image?.media"
                style="
                  height: 80%;
                  width: auto;
                  object-fit: contain;
                  object-position: center;
                "
                :alt="slide.image?.alt"
              />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
const modules = [Navigation, Autoplay, EffectFade];

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  375: {
    slidesPerView: 2,
    spaceBetween: 20,
  },

  600: {
    slidesPerView: 2.5,
    spaceBetween: 30,
  },
  800: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1318: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

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
