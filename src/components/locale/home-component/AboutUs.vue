<template>
  <div class="about-us-sec w-100">
    <img
      loading="lazy"
      class="d-none d-md-block"
      src="/src/assets/images/bg-images/about.jpg"
      style="
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      "
      alt=""
    />
    <div class="about-us--text d-none d-md-block">
      <img
        loading="lazy"
        src="/src/assets/images/sm-images/Group.png"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          max-width: 20rem;
          height: auto;
          max-height: 50%;
        "
        alt=""
      />
      <div class="about-us--content">
        <p class="about-us-title head-secondary">
          {{ props.secData.items.data[0].title }}
        </p>
        <p class="about-us-parag body-desc-secondary">
          {{ props.secData.items.data[0].desc }}
        </p>
        <button class="read-more-btn" @click="$router.push({ name: 'About' })">
          <p>
            {{ $t("button.know-more") }}
          </p>
          <div class="read-more-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                stroke="black"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 12L3.67 12"
                stroke="black"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <img
      loading="lazy"
      class="d-block d-md-none"
      src="/src/assets/images/sm-images/Group.png"
      style="position: absolute; top: 0; left: 20px; width: 30%; height: auto"
      alt=""
    />
    <div class="about-us--content d-block d-md-none">
      <p class="about-us-title head-secondary">
        {{ props.secData.items.data[0].title }}
      </p>
      <p class="about-us-parag body-desc-secondary">
        {{ props.secData.items.data[0].desc }}
      </p>
      <button class="read-more-btn">
        <p>{{ $t("button.know-more") }}</p>
        <div class="read-more-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
              stroke="black"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.5 12L3.67 12"
              stroke="black"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
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
