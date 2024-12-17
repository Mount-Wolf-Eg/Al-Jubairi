<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="contact_us?.page?.data?.title"
      :secDesc="contact_us?.page?.data?.desc"
    ></BreadCrump>
    <section class="inside-page d-flex justify-content-center flex-wrap gap-5">
      <div class="contact-info">
        <h2>{{ contact_us?.sections?.data?.[0]?.title }}</h2>
        <p>
          {{ contact_us?.sections?.data?.[0]?.desc }}
        </p>
        <div class="social-links d-flex flex-wrap align-items-center gap-5">
          <a
            v-for="setting in settings.filter(
              (s) => !['header_logo', 'footer_logo', 'about'].includes(s.key)
            )"
            :key="setting.id"
            :href="setting.value"
            target="_blank"
          >
            <img :src="getIcon(setting.key)" alt="Social Icon" />
          </a>
        </div>
        <h3>فروعنا:</h3>
        <p>الخبر: 2107 طريق الملك فهد، عمارة العساف، 34111، الصندوق: 8471</p>
        <p>الهاتف: +966 (13) 894 8788</p>
        <p>الرياض: 3449 طريق الملك فهد، عمارة الفلاح، 13521</p>
        <p>الهاتف: +966 (11) 44 88 7878</p>
      </div>
      <div class="form-container">
        <CommuntiyForm formType="contact_us" />
      </div>
    </section>
  </main>
  <section v-else>Loading...</section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import CommuntiyForm from "@/reusables/forms/CommunityForm/CommuntiyForm.vue";
import { useSettingsStore } from "@/stores/settingStore";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const crump = ref([{ name: "تواصل معنا", rout: "/contact" }]);
const pageStore = usePageStore();
const settingsStore = useSettingsStore();
const { contact_us } = storeToRefs(pageStore);
const { settings } = storeToRefs(settingsStore);
const isLoading = ref(true);

onMounted(async () => {
  if (
    !contact_us.value ||
    !contact_us.value.sections ||
    contact_us.value.sections.data.length === 0
  ) {
    await pageStore.getPageData("contact_us");
  }

  await settingsStore.getSettingsData(); // Fetch settings data
  isLoading.value = false;
});

// Function to get the icon URL based on the key
const getIcon = (key) => {
  const icons = {
    phone: "/src/assets/icons/phone.svg",
    email: "/src/assets/icons/email-icon.svg",
    facebook: "/src/assets/icons/facebook-icon.svg",
    x: "/src/assets/icons/x-icon.svg",
    youtube: "/src/assets/icons/youtube.svg",
    tiktok: "/src/assets/icons/tiktok.svg",
    instagram: "/src/assets/icons/instagram.svg",
    whatsapp: "/src/assets/icons/whatsapp.svg",
  };
  return icons[key] || "/src/assets/icons/default-icon.svg"; // Default icon if key not found
};
</script>

<style lang="scss" src="./Contact.scss"></style>
