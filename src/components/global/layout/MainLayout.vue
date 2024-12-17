<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
      width: 100vw;
    "
  >
    <NavBar v-if="!showResponsiveHeader" />
    <NavBarResponsive v-if="showResponsiveHeader" />

    <div style="flex: 1">
      <slot></slot>
    </div>

    <Footer v-if="!showResponsiveHeader" />
    <FooterResponsive v-if="showResponsiveHeader" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavBar from "./NavBar.vue";
import NavBarResponsive from "./NavBarResponsive.vue";
import Footer from "./Footer.vue";
import FooterResponsive from "./FooterResponsive.vue";

const showResponsiveHeader = ref(false);

onMounted(() => {
  window.innerWidth <= 577
    ? (showResponsiveHeader.value = true)
    : (showResponsiveHeader.value = false);
}),
  (window.onresize = () => {
    window.innerWidth <= 577
      ? (showResponsiveHeader.value = true)
      : (showResponsiveHeader.value = false);
  });
</script>

<style lang="scss" scoped></style>
