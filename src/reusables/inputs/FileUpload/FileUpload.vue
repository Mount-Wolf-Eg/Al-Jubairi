<template>
  <div class="upload-field center-row justify-content-between">
    <label class="up-label p-0" :for="`file-upload-${props.for}`">
      <div
        class="d-flex justify-content-between text-center px-5"
        style="color: #464a61; font-size: 1.2rem; font-weight: bold"
      >
        <div>{{ label || $t("upload_file") }}</div>
      </div>
    </label>
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
    <span v-else>
      <svg
        style="width: 2rem; height: 2rem"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.75 19.25V24.9167C27.75 25.6681 27.4515 26.3888 26.9201 26.9201C26.3888 27.4515 25.6681 27.75 24.9167 27.75H5.08333C4.33189 27.75 3.61122 27.4515 3.07986 26.9201C2.54851 26.3888 2.25 25.6681 2.25 24.9167V19.25M22.0833 9.33333L15 2.25M15 2.25L7.91667 9.33333M15 2.25V19.25"
          stroke="#464A61"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
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

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  .spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid rgba(4, 119, 190, 0.2);
    border-top-color: #0477be;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.upload-field {
  margin: 1rem 0 0;
  position: relative;
  border-radius: 1.2rem;
  border: 1px solid #0477be;
  padding: 0.5rem;
  background-color: #f4f3f3;

  input {
    width: 35% !important;
    background-color: #f4f3f3;
    color: transparent;
    border: 1px solid #0477be;
    font-size: 0.8rem;
  }

  label {
    width: 65% !important;
    cursor: pointer;
    padding: 1rem 0;
  }
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  .file-icon {
    font-size: 2rem;
  }

  .file-name {
    font-size: 1rem;
    font-weight: bold;
    color: #464a61;
  }
}
</style>
