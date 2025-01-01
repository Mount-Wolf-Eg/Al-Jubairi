<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";

const name = "GoogleAnalytics";

onMounted(() => {
  // Load the Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-G-67FEM1N971";
  document.head.appendChild(script);

  // Initialize Google Analytics
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-67FEM1N971");
  };
});
</script>
