<template>
  <main>
    <section class="hero-section">
      <swiper
        effect="fade"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          waitForTransition: false,
        }"
        class="swiper h-100"
        :modules="modules"
        :pagination="{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        }"
        :loop="true"
        :slides-per-view="1"
        :Autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          waitForTransition: false,
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
        <swiper-slide
          v-for="(item, i) in props.secData.items.data"
          :key="i"
          class="slide h-100"
        >
          <div class="slider-box h-100 row">
            <img
              v-if="item.image?.media"
              loading="lazy"
              :src="item.image?.media"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                filter: brightness(0.7);
              "
              :alt="item.image?.alt"
            />
            <img
              v-else
              src="/src/assets/images/sm-images/footerResp.jpg"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                filter: brightness(0.7);
              "
              :alt="item.image?.alt"
            />
            <div class="hero-text">
              <div class="hero-text-box">
                <p class="hero-title head-primary">
                  {{ item.title }}
                </p>
                <p class="hero-desc body-desc-primary">
                  {{ item.desc }}
                </p>

                <router-link to="/contact" v-if="item?.desc">
                  <button class="btn-round">
                    {{ $t("button.Book") }}
                  </button>
                </router-link>
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
