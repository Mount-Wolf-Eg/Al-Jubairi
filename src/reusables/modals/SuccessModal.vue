<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 4L20 20M20 4L4 20"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="closeModal">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "تم إرسال بياناتك بنجاح!",
  },
  message: {
    type: String,
    default:
      "شكراً على التواصل معنا. سنقوم بمراجعة طلبك والرد عليك في أقرب وقت.",
  },
  buttonText: {
    type: String,
    default: "الصفحة الرئيسية",
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  color: var(--col-dark);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.close-button svg {
  width: 16px;
  height: 16px;
  fill: var(--col-dark);
}

.modal-content h2 {
  font-size: 18px;
}

.modal-content p {
  font-size: 14px;
}
</style>
