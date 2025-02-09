<template>
  <div class="select-box">
    <label class="select-label" v-if="props.select.label">{{
      props.select.label
    }}</label>
    <select
      v-model="selectedValue"
      @change="handleChange"
      :class="{ ' border-danger': error }"
    >
      <option disabled value="">{{ props.select.placeholder }}</option>
      <option
        v-for="option in props.select.options"
        :key="option.value"
        :value="option.value"
      >
        {{
          select.typ === "suggest" ? $t(`form.${option.label}`) : option.label
        }}
      </option>
    </select>
    <span v-if="error" class="text-danger">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  select: {
    type: Object,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

const selectedValue = ref("");

const handleChange = () => {
  props.select.change(selectedValue.value);
};
</script>

<style lang="scss" scoped src="./Select.scss"></style>
