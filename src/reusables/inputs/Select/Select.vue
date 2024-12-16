<template>
  <div class="select-box">
    <label class="select-label" v-if="props.select.label">{{
      props.select.label
    }}</label>
    <select v-model="selectedValue" @change="handleChange">
      <option disabled value="">{{ props.select.placeholder }}</option>
      <option
        v-for="option in props.select.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  select: {
    type: Object,
    required: true,
  },
});

const selectedValue = ref("");

const handleChange = () => {
  props.select.change(selectedValue.value);
};
</script>

<style lang="scss" scoped>
@import "./Select.scss";
</style>
