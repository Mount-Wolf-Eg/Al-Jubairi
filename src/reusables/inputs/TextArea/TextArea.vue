<template>
  <div class="textarea-box">
    <label class="textarea-label" v-if="props.label">{{ label }}</label>
    <textarea
      name="description"
      type="text"
      :placeholder="holder"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const emits = defineEmits(["textData", "update:modelValue"]);

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
@import "./TextArea.scss";
</style>
