<template>
  <div class="file-upload">
    <label for="file-upload" class="upload-label" v-if="label">{{
      label
    }}</label>
    <input
      type="file"
      id="file-upload"
      class="file-input"
      :class="{ ' border-danger': error }"
      @change="handleFileChange"
      :disabled="disable"
    />
    <span v-if="error" class="text-danger">{{ error }}</span>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: File,
    required: false,
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
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  emits("update:modelValue", file);
};
</script>

<style lang="scss" scoped>
.file-upload {
  .upload-label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .file-input {
    display: block;
    margin-bottom: 0.5rem;
  }
}
</style>
