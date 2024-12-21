<template>
  <div>
    <label class="file-label">
      {{ label || $t("upload_file") }}
    </label>
    <div class="upload-field center-row justify-content-between">
      <input
        class="style-17 img-field-st d-none"
        type="file"
        :id="`file-upload-${props.for}`"
        @change="handleFileChange"
        :disabled="disable || loading"
        accept=".pdf,.docx,image/*"
      />
      <!-- Show error -->
      <span v-if="error" class="text-danger">{{ error }}</span>
      <!-- Upload Spinner -->
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      <!-- File Upload Icon -->
      <label class="up-label p-0" :for="`file-upload-${props.for}`" v-else>
        <svg
          width="32"
          height="22"
          viewBox="0 0 32 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.8 8.38536C24.8933 3.78536 20.8533 0.332031 16 0.332031C12.1467 0.332031 8.8 2.5187 7.13333 5.7187C3.12 6.14536 0 9.54536 0 13.6654C0 18.0787 3.58667 21.6654 8 21.6654H25.3333C29.0133 21.6654 32 18.6787 32 14.9987C32 11.4787 29.2667 8.62536 25.8 8.38536ZM25.3333 18.9987H8C5.05333 18.9987 2.66667 16.612 2.66667 13.6654C2.66667 10.932 4.70667 8.65203 7.41333 8.37203L8.84 8.22536L9.50667 6.9587C10.7733 4.5187 13.2533 2.9987 16 2.9987C19.4933 2.9987 22.5067 5.4787 23.1867 8.90536L23.5867 10.9054L25.6267 11.052C27.7067 11.1854 29.3333 12.932 29.3333 14.9987C29.3333 17.1987 27.5333 18.9987 25.3333 18.9987ZM10.6667 12.332H14.0667V16.332H17.9333V12.332H21.3333L16 6.9987L10.6667 12.332Z"
            fill="#595959"
          />
        </svg>
      </label>
    </div>
  </div>

  <!-- Uploaded File Preview -->
  <div
    v-if="userImg || fileName"
    style="position: relative; width: fit-content; margin: 1rem 0"
  >
    <button @click="removeFile()" style="position: absolute; right: 0; top: 0">
      <svg
        fill="#000000"
        style="width: 1.5rem; height: 1.5rem"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M13,3.05A7,7,0,1,0,13,13,7,7,0,0,0,13,3.05ZM12,12A5.6,5.6,0,0,1,4,12,5.61,5.61,0,0,1,4,4,5.6,5.6,0,0,1,12,4,5.61,5.61,0,0,1,12,12ZM10.65,4.08,8,6.73,5.35,4.08,4.08,5.35,6.73,8,4.08,10.65l1.27,1.27L8,9.27l2.65,2.65,1.27-1.27L9.27,8l2.65-2.65Z"
          />
        </g>
      </svg>
    </button>
    <template v-if="userImg">
      <img
        loading="lazy"
        class="mt-3"
        :src="userImg"
        alt="Uploaded file preview"
        style="max-width: 10rem; border-radius: 7px"
      />
    </template>
    <template v-else>
      <div class="file-preview">
        <span class="file-icon">📄</span>
        <span class="file-name">{{ fileName }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFileUploadStore } from "@/stores/fileUploadStore";

const userImg = ref("");
const fileName = ref("");
const file = ref(null);
const loading = ref(false); // Spinner state
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
  for: {
    type: String,
    default: "",
    required: false,
  },
});
const fileUploadStore = useFileUploadStore();

const handleFileChange = async (event) => {
  const uploadedFile = event.target.files[0];
  if (!uploadedFile) {
    resetFile();
    return;
  }

  if (uploadedFile.size > 10 * 1024 * 1024) {
    resetFile();
    mainStore().showAlert("File size cannot be more than 10 MB", 2);
    return;
  }

  loading.value = true; // Show spinner
  const formData = new FormData();
  formData.append("file", uploadedFile);
  formData.append("attachment_type", "file");
  formData.append("model", "contacts");
  file.value = uploadedFile;

  try {
    const response = await fileUploadStore.uploadFile(formData);
    userImg.value = uploadedFile.type.includes("image")
      ? URL.createObjectURL(uploadedFile)
      : "";
    fileName.value = uploadedFile.type.includes("image")
      ? ""
      : uploadedFile.name;
    emits("update:modelValue", response?.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    loading.value = false; // Hide spinner
  }
};

const removeFile = () => {
  resetFile();
};

const resetFile = () => {
  userImg.value = "";
  fileName.value = "";
  file.value = null;
  emits("update:modelValue", file.value);
};
</script>

<style lang="scss" scoped src="./FileUpload.scss"></style>
