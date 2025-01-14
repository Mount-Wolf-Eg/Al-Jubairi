<template>
  <div class="d-flex justify-content-center align-items-center fs-3">
    <div class="d-flex gap-3">
      <div
        class="d-flex justify-content-between align-items-center"
        style="width: fit-content"
      >
        404 Not found
      </div>
      <router-link
        style="
          text-decoration: none;
          color: white;
          border: 1px solid white;
          border-radius: 0.9rem;
          padding: 1rem;
        "
        to="/home"
        >Return to home</router-link
      >
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
