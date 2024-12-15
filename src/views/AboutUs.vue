<template>
  <main>
    <BreadCrump :crump="crump" :secTitle="'one'" :secDesc="'two'"></BreadCrump>
  </main>
</template>
<script setup>
import { ref } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";

const crump = ref([{ name: "about us", rout: "/about" }]);
</script>
