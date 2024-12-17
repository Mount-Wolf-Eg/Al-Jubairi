<template>
  <div class="input-box">
    <label for="input-field" class="input-label" v-if="props.label">{{
      label
    }}</label>
    <input
      type="text"
      class="input form-input"
      :placeholder="holder"
      :class="{ ' border-danger': error }"
      :value="modelValue"
      :disabled="disable"
      id="input-field"
      @input="updateValue($event.target.value)"
    />
    <span v-if="error" class="text-danger">{{ error }}</span>
  </div>
</template>

<script setup>
const emits = defineEmits(["inputData", "update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
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

<style lang="scss" scoped>
@import "./InputField.scss";
</style>
