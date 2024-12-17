<template>
  <div class="textarea-box">
    <label class="textarea-label" v-if="props.label">{{ label }}</label>
    <textarea
      name="description"
      type="text"
      :placeholder="holder"
      :value="modelValue"
      :class="{ ' border-danger': error }"
      @input="updateValue($event.target.value)"
    ></textarea>
    <div class="d-flex justify-content-between">
      <span v-if="error" class="text-danger">{{ error }}</span>
      <p>(250/0) حرفً ابحد أقصى</p>
    </div>
  </div>
</template>

<script setup>
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
@import "./TextArea.scss";
</style>
