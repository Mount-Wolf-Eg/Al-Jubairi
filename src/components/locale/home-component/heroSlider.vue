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
        <div class="w-100">
          <p class="head-primary">خيارك الأول للتمثيل القانوني</p>
          <p class="body-desc-primary">
            بخبرة قانونية راسخة قدمنا الدعم للأفراد والشركات في المملكة لأكثر من
            15 عاماً. نحن هنا لتقديم استشارات مدروسة وحلول قانونية مبتكرة لتحقيق
            العدالة في كافة القضايا، مع الالتزام بأعلى المعايير الدولية.
          </p>
          <button class="btn-round-primary">احجز استشارتك القانونية</button>
        </div>
        <div class="bg-danger w-100"></div>
      </div>
    </swiper-slide>
  </swiper>
  <div class="hero-section">
    <swiper
      class="swiper h-100"
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
      <swiper-slide
        v-for="(item, i) in 20"
        :key="i"
        class="slide bg-danger h-100 my-auto"
      >
        <img
          src="/src/assets/images/PHN_1434.webp"
          style="
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: center;
            filter: brightness(0.7);
          "
          alt=""
        />
        <div class="hero-text">
          <div class="w-75 mx-auto hero-text-box">
            <p class="hero-title title-primary">خيارك الأول للتمثيل القانوني</p>
            <p class="hero-desc">
              بخبرة قانونية راسخة قدمنا الدعم للأفراد والشركات في المملكة لأكثر
              من 15 عاماً. نحن هنا لتقديم استشارات مدروسة وحلول قانونية مبتكرة
              لتحقيق العدالة في كافة القضايا، مع الالتزام بأعلى المعايير
              الدولية.
            </p>
            <button class="main-btn">احجز استشارتك القانونية</button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
// Corrected imports for Swiper
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

// Modules for Swiper
const modules = [Navigation, Autoplay, EffectFade];
</script>

<style lang="scss" scoped></style>
