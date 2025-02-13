<template>
  <form @submit.prevent="handleSubmit">
    <div class="d-flex">
      <InputField
        v-model="formData.firstName"
        :label="$t('form.firstName') + ' *'"
        :holder="$t('form.firstNamePlaceholder')"
        :error="errors.firstName"
      />
      <InputField
        v-model="formData.lastName"
        :label="$t('form.lastName') + ' *'"
        :holder="$t('form.lastNamePlaceholder')"
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
      :countryCode="true"
      :error="errors.phone"
    />
    <!--  -->
    <Select
      v-if="formType === 'community' || formType === 'suggest'"
      :select="{
        typ: formType,
        placeholder: `${
          props.formType === 'community'
            ? $t('form.inquiryTypePlaceholder')
            : $t('form.contactTypePlaceholder')
        }`,
        label: `${
          props.formType === 'community'
            ? $t('form.inquiryType') + ' *'
            : $t('form.conatctType') + ' *'
        }`,
        options: inquiryTypes,
        change: (val) => {
          formData.inquiryType = val;
        },
      }"
      :error="errors.inquiryType"
    />
    <InputField
      v-model="formData.subject"
      v-if="formType !== 'employment'"
      :label="$t('form.subject') + ' *'"
      :holder="$t('form.subjectPlaceholder')"
      :error="errors.subject"
    />
    <FileUpload
      v-if="formType === 'employment'"
      v-model="formData.media"
      :label="$t('form.uploadCV') + ' *'"
      :error="errors.media"
    />
    <TextArea
      v-model="formData.message"
      :label="$t('form.message') + (formType !== 'employment' ? ' *' : '')"
      :holder="$t('form.messagePlaceholder')"
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
import { ref, defineProps, computed } from "vue";
import InputField from "@/reusables/inputs/InputField/InputField.vue";
import TextArea from "@/reusables/inputs/TextArea/TextArea.vue";
import Select from "@/reusables/inputs/Select/Select.vue";
import PhoneInput from "@/reusables/inputs/PhoneInput/PhoneInput.vue";
import EmailInput from "@/reusables/inputs/EmailInput/EmailInput.vue";
import { useContactStore } from "@/stores/contactStore";
import SuccessModal from "@/reusables/modals/SuccessModal.vue";
import FileUpload from "@/reusables/inputs/FileUpload/FileUpload.vue";

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
  inquiryType: "other",
  subject: "",
  message: "",
  media: "",
});

const errors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
  media: "",
});

const isModalVisible = ref(false);

const inquiryTypes = computed(() => {
  if (props.formType === "community") {
    return [
      { value: "freeConsultation", label: "استشارة مجانية" },
      { value: "microEnterprises", label: "منشآت متناهية الصغر" },
      { value: "charity", label: "مؤسسة خيرية" },
      { value: "cooperativeTraining", label: "تدريب تعاوني" },
    ];
  }
  return [
    { value: "suggestion", label: "suggestion" },
    { value: "complaint", label: "complaint" },
    { value: "other", label: "other" },
  ];
});

const validateForm = () => {
  let valid = true;
  if (props.formType !== "employment") {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = ""; // Reset errors
      if (key !== "media" && !formData.value[key].trim()) {
        errors.value[key] = t("form.required") + " " + t(`form.${key}`);
        valid = false;
      }
    });
  } else {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = ""; // Reset errors
      // Skip validation for optional fields if formType is 'employment'
      if (
        !["inquiryType", "subject", "message"].includes(key) &&
        (key !== "media" ? !formData?.value[key]?.trim() : !formData.value[key])
      ) {
        errors.value[key] = t("form.required") + " " + t(`form.${key}`);
        valid = false;
      }
    });
  }

  return valid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    const contactData =
      props.formType == "employment"
        ? {
            first_name: formData.value.firstName,
            last_name: formData.value.lastName,
            phone_code: "966",
            phone: formData.value.phone,
            email: formData.value.email,
            content: formData.value.message,
            type: props.formType,
            "file[media]": formData.value.media,
          }
        : {
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
        media: "",
      };
    }
  }
};
</script>

<style scoped src="./CommunityForm.scss"></style>
