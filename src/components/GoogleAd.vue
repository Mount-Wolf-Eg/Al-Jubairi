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
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-4YTLWTH65K";
  document.head.appendChild(script);

  // Initialize Google Analytics
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-4YTLWTH65K");
  };
});
</script>
