<template>
  <form @submit.prevent="handleSubmit">
    <div class="d-flex">
      <InputField
        v-model="formData.firstName"
        :label="$t('form.firstName') + ' *'"
        :holder="$t('form.firstNamePlaceholder')"
        required
        :error="errors.firstName"
      />
      <InputField
        v-model="formData.lastName"
        :label="$t('form.lastName') + ' *'"
        :holder="$t('form.lastNamePlaceholder')"
        required
        :error="errors.lastName"
      />
    </div>
    <EmailInput
      v-model="formData.email"
      :label="$t('form.email') + ' *'"
      :holder="$t('form.emailPlaceholder')"
      :error="errors.email"
    />
    <PhoneInput
      v-model="formData.phone"
      :label="$t('form.phone') + ' *'"
      :holder="$t('form.phonePlaceholder')"
      required
      :countryCode="true"
      :error="errors.phone"
    />
    <Select
      :select="{
        placeholder: $t('form.inquiryTypePlaceholder'),
        label: $t('form.inquiryType') + ' *',
        options: inquiryTypes,
        change: (val) => {
          formData.inquiryType = val;
        },
      }"
      :error="errors.inquiryType"
    />
    <InputField
      v-model="formData.subject"
      :label="$t('form.subject') + ' *'"
      :holder="$t('form.subjectPlaceholder')"
      required
      :error="errors.subject"
    />
    <TextArea
      v-model="formData.message"
      :label="$t('form.message') + ' *'"
      :holder="$t('form.messagePlaceholder')"
      required
      :error="errors.message"
    />
    <div class="d-flex justify-content-end">
      <button type="submit">{{ $t("button.submit") }}</button>
    </div>
    <SuccessModal :isVisible="isModalVisible" @close="isModalVisible = false" />
  </form>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, defineProps } from "vue";
import InputField from "@/reusables/inputs/InputField/InputField.vue";
import TextArea from "@/reusables/inputs/TextArea/TextArea.vue";
import Select from "@/reusables/inputs/Select/Select.vue";
import PhoneInput from "@/reusables/inputs/PhoneInput/PhoneInput.vue";
import EmailInput from "@/reusables/inputs/EmailInput/EmailInput.vue";
import { useContactStore } from "@/stores/contactStore";
import SuccessModal from "@/reusables/modals/SuccessModal.vue";

const { t } = useI18n();
const contactStore = useContactStore();

const props = defineProps({
  formType: {
    type: String,
    default: "community", // Default value
  },
});

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
});

const errors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
});

const isModalVisible = ref(false);

const inquiryTypes = [
  { value: "suggestion", label: "اقتراح" },
  { value: "other", label: "أخرى" },
  { value: "complaint", label: "شكوى" },
];

const validateForm = () => {
  let valid = true;
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = ""; // Reset errors
    if (!formData.value[key].trim()) {
      errors.value[key] = t("form.required") + " " + t(`form.${key}`);
      valid = false;
    }
  });
  return valid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    const contactData = {
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      phone_code: "966",
      phone: formData.value.phone,
      email: formData.value.email,
      title: formData.value.subject,
      content: formData.value.message,
      type: props.formType,
      for: formData.value.inquiryType,
    };

    const response = await contactStore.submitContactForm(contactData);

    // Show the modal only if the response is successful
    if (response) {
      isModalVisible.value = true;

      // Reset the form data
      formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      };
    }
  }
};
</script>

<style scoped src="./CommunityForm.scss"></style>
