<template>
  <div class="support-sec container px-0">
    <div class="support-parralax px-5 px-md-0" style="position: relative">
      <div
        class="parralax-img"
        v-for="(item, i) in props.secData.items.data"
        :key="i"
      >
        <img
          loading="lazy"
          :src="item.image?.media"
          style="width: 100%; object-fit: cover; object-position: center"
          :alt="item.image?.alt"
        />
        <div class="parralax-text">
          <p class="parralax-title head-secondary">{{ item.title }}</p>
          <p class="parralax-parag body-desc-secondary">
            {{ item.desc }}
          </p>
          <button
            v-if="item.has_items"
            class="read-more-btn"
            @click="
              $router.push({ name: 'serviceData', params: { id: item.id } })
            "
          >
            <p>اعرف المزيد</p>
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
