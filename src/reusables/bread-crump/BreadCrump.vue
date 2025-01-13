<template>
  <div class="bread-crump scrolled">
    <div class="container px-5 px-xl-0 pt-2 pb-0">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">{{ $t("menu.home") }}</router-link>
          </li>
          <li class="breadcrumb-item" v-for="(item, i) in crump" :key="i">
            <router-link :to="item.rout">{{
              item.name.length > 30
                ? $t(item.name?.slice(0, 30)) + "..."
                : $t(item.name)
            }}</router-link>
          </li>
        </ol>
      </nav>
    </div>
  </div>
  <div class="bread-crump pt-0">
    <div class="container px-5 px-xl-0 pt-0">
      <div class="bread-text">
        <p class="bread-title head-secondary" style="color: var(--col-white)">
          {{ secTitle }}
        </p>
        <p class="bread-desc body-desc-primary mx-auto">
          {{ secDesc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  crump: {
    type: Array,
    required: true,
  },
  secTitle: {
    type: String,
    required: false,
  },
  secDesc: {
    type: String,
    required: false,
  },
});
// const scrollTop = ref(0);
// const handleScroll = () => {
//   scrollTop.value = window.scrollY || document.documentElement.scrollTop;
// };
// onMounted(() => {
//   handleScroll();
//   window.addEventListener("scroll", handleScroll, { passive: true });
// });
// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll, { passive: true });
// });
// watch(scrollTop, () => {
//   if (scrollTop.value > 350 && document.documentElement.scrollHeight > 1500) {
//     document.querySelector(".bread-crump").classList.add("scrolled");
//   } else {
//     document.querySelector(".bread-crump").classList.remove("scrolled");
//   }
// });
</script>

<style lang="scss" scoped>
.breadcrumb {
  --bs-breadcrumb-divider: ">";
  --bs-breadcrumb-divider-color: #fff;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: var(--bs-breadcrumb-divider-color);
}
.bread-crump,
.bread-text {
  transition: all 0.3s cubic-bezier(0.23, -0.01, 1, 0.87);
}
.scrolled {
  z-index: 9999 !important;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem 0;
  width: 100%;
  border-bottom-right-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;
  background-color: #151516;
}
</style>
