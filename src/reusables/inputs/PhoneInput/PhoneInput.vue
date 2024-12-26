<template>
  <div class="phone-input-box">
    <label>{{ label }}</label>
    <vue-tel-input
      v-model="phone"
      :auto-default-country="false"
      :default-country="966"
      :inputOptions="{ placeholder: holder }"
      required
      class="vue-tel-input"
      :class="{ ' border-danger': error }"
    />
    <span v-if="error" class="text-danger">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  holder: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

const phone = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    phone.value = newValue;
  }
);

const emit = defineEmits(["update:modelValue"]);

watch(phone, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped src="./PhoneInput.scss"></style>
