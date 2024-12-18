<template>
  <div class="email-box">
    <label for="email-field" class="email-label" v-if="label">{{
      label
    }}</label>
    <div class="input-container">
      <img
        src="/src/assets/icons/email-icon.svg"
        alt="Email Icon"
        class="email-icon"
      />
      <input
        type="email"
        class="inpt form-inpt"
        :placeholder="holder"
        :class="{ ' border-danger': error }"
        :value="modelValue"
        :disabled="disable"
        id="email-field"
        @input="updateValue($event.target.value)"
      />
      <span v-if="error" class="text-danger">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  holder: {
    type: String,
    required: false,
    default: "",
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: () => "",
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss" scoped src="./EmailInput.scss"></style>
