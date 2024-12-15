<template>
  <div class="inpt-box">
    <label
      for="inpt-field"
      style="background-color: transparent !important"
      class="inpt-label mb-4"
      v-if="props.label"
      >{{ label }}</label
    >
    <input
      type="text"
      class="inpt form-inpt"
      :placeholder="holder"
      :class="appear"
      :value="modelValue"
      :disabled="disable"
      id="inpt-field"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const emits = defineEmits(["inptData", "update:modelValue"]);

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
  appear: {
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
});

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss" scoped>
.inpt-box {
  input {
    padding: 2rem 2rem;
    width: 100%;
    border-radius: 1.2rem;
    border: 1px solid #464a61;
  }
}
.inpt-label {
  color: var(--col-text) !important;
  font-size: var(--fs-16) !important;
  font-weight: var(--fw-bold) !important;
  line-height: var(--line-h-20) !important;
  background-color: var(--col-gray) !important;
}

.form-inpt {
  border: 1px solid #0477be !important;
  height: 5rem;
  width: 100%;
  border-radius: 0.9rem;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 3.454rem;
  text-align: right;
  background-color: #f4f3f3;
  padding: 0 15px;
}
</style>
