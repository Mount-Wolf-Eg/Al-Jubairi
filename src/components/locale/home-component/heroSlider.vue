<template>
  <main>
    <!-- <swiper
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
  </swiper> -->
    <section class="hero-section">
      <swiper
        effect="fade"
        :autoplay="{
          delay: 500,
          disableOnInteraction: false,
        }"
        class="swiper h-100"
        :modules="modules"
        :pagination="{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        }"
        :slides-per-view="1"
        :Autoplay="{
          delay: 500,
          disableOnInteraction: false,
          waitForTransition: true,
        }"
        :space-between="10"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :preload-images="false"
        :Lazy="true"
        :centered-slides="true"
      >
        <!--  
        :speed="500"
        
      :effect="'fade'"
        :navigation="false"
        :loop="true"
      -->
        <swiper-slide
          v-for="(item, i) in props.secData.items.data"
          :key="i"
          class="slide bg-danger h-100"
        >
          <div class="slider-box h-100 row">
            <!-- src="/src/assets/images/PHN_1434.webp" -->
            <img
              loading="lazy"
              :src="item.image.media"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                filter: brightness(0.7);
              "
              :alt="item.image.alt"
            />
            <div class="hero-text">
              <div class="hero-text-box">
                <p class="hero-title head-primary">
                  <!-- خيارك الأول للتمثيل القانوني -->
                  {{ item.title }}
                </p>
                <p class="hero-desc body-desc-primary">
                  {{ item.desc }}
                  <!-- بخبرة قانونية راسخة قدمنا الدعم للأفراد والشركات في المملكة
                لأكثر من 15 عاماً. نحن هنا لتقديم استشارات مدروسة وحلول قانونية
                مبتكرة لتحقيق العدالة في كافة القضايا، مع الالتزام بأعلى
                المعايير الدولية. -->
                </p>
                <button class="btn-round-primary">
                  {{ $t("button.Book") }}
                  <!-- احجز استشارتك القانونية -->
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>
  </main>
</template>

<script setup>
// Corrected imports for Swiper
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
const modules = [Navigation, Autoplay, EffectFade];

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
