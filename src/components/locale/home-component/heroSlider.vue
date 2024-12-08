<template>
  <swiper
    class="swiper hero-swiper"
    :modules="modules"
    :space-between="30"
    :centered-slides="true"
    :navigation="false"
    :loop="true"
    :effect="'fade'"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
    :speed="500"
  >
    <swiper-slide v-for="(item, i) in 20" :key="i" class="slide">
      <img src="/src/assets/images/PHN_1434.webp" alt="" />
      <div class="hero-content container grd grd-2-col">
        <div>kj</div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
// Corrected imports for Swiper
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

// Modules for Swiper
const modules = [Navigation, Autoplay, EffectFade];
</script>

<style lang="scss" scoped></style>
