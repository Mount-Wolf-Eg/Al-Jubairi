<template>
  <div class="bread-crump">
    <div class="container px-5 px-xl-0">
      <nav aria-label="breadcrumb ">
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
</script>

<style lang="scss" scoped>
.breadcrumb {
  --bs-breadcrumb-divider: ">";
  --bs-breadcrumb-divider-color: #fff;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: var(--bs-breadcrumb-divider-color);
}
</style>
