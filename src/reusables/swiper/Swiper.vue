<script setup>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const modules = ref([Pagination, Navigation, Autoplay]);
const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  375: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  575: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};
</script>

<template>
  <div>
    <swiper
      :modules="modules"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :slides-per-view="4"
      :space-between="50"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :preload-images="false"
      :Lazy="true"
      :Autoplay="{
        delay: 1000,
        disableOnInteraction: true,
        waitForTransition: true,
      }"
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="(product, i) in 20" :key="i">
        <!-- loading placeholder -->
        <div class="card border-0" aria-hidden="true">
          <svg
            class="bd-placeholder-img card-img-top"
            width="100%"
            height="180"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
          </svg>
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <a
              class="btn btn-primary disabled placeholder col-6"
              aria-disabled="true"
            ></a>
          </div>
        </div>
        <!-- card -->
        <div class="card border-0">
          <div
            class="quick-view-container overflow-hidden w-100 position-relative"
            style="height: 25rem; min-height: 150px"
          >
            <div style="width: 50rem; height: 50rem"></div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
//  .swiper {
//   height: 60rem !important;
// }

// .swiper-pagination-bullets {
//   bottom: 0;
// }

// .swiper-pagination-bullet {
//   width: 1.2rem;
//   height: 1.2rem;
// }

// .swiper-button-prev,
// .swiper-button-next {
//   font-weight: 600;
//   width: 3rem !important;
//   height: 3rem !important;
//   min-width: 25px !important;
//   min-height: 25px !important;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   border: 2px solid #505050;
//   background-color: white;
//   top: 45%;
//   padding: 2rem;
//   &::after {
//     color: #505050;
//     font-size: 2rem;
//   }
// }
</style>
