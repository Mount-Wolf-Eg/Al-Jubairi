<template>
  <form @submit.prevent="handleSubmit">
    <div class="d-flex">
      <InputField
        v-model="formData.firstName"
        label="الاسم الأول *"
        holder="أدخل اسمك هنا"
        required
      />
      <InputField
        v-model="formData.lastName"
        label="الاسم الأخير *"
        holder="أدخل اسم العائلة هنا"
        required
      />
    </div>
    <EmailInput
      v-model="formData.email"
      label="البريد الإلكتروني *"
      holder="أدخل بريدك الإلكتروني"
      required
    />
    <PhoneInput
      v-model="formData.phone"
      label="رقم الجوال *"
      holder="أدخل رقم الجوال"
      required
      :countryCode="true"
    />
    <Select
      :select="{
        placeholder: 'اختر نوع الاستفسار',
        label: 'نوع الاستفسار*',
        options: inquiryTypes,
        change: (val) => {
          formData.inquiryType = val;
        },
      }"
    />
    <InputField
      v-model="formData.subject"
      label="الموضوع *"
      holder="أدخل الموضوع هنا"
      required
    />
    <TextArea
      v-model="formData.message"
      label="رسالة *"
      holder="اكتب رسالتك هنا"
      required
    />
    <div class="d-flex justify-content-end">
      <button type="submit">إرسال</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import InputField from "@/reusables/inputs/InputField/InputField.vue";
import TextArea from "@/reusables/inputs/TextArea/TextArea.vue";
import Select from "@/reusables/inputs/Select/Select.vue";
import PhoneInput from "@/reusables/inputs/PhoneInput/PhoneInput.vue";
import EmailInput from "@/reusables/inputs/EmailInput/EmailInput.vue";

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
});

const inquiryTypes = [
  { value: "استفسار عام", label: "استفسار عام" },
  { value: "دعم فني", label: "دعم فني" },
  { value: "شكاوى", label: "شكاوى" },
];

const handleSubmit = () => {
  console.log(formData.value);
};
</script>

<style scoped src="./CommunityForm.scss"></style>
