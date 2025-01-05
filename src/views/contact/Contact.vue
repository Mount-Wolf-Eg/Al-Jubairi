<template>
  <main v-if="!isLoading">
    <BreadCrump
      :crump="crump"
      :secTitle="contact_us?.page?.data?.title"
      :secDesc="contact_us?.page?.data?.desc"
    ></BreadCrump>
    <section class="inside-page">
      <div class="container contact-page grd grd-2-col">
        <div class="contact-info">
          <h2>{{ contact_us?.sections?.data?.[0]?.title }}</h2>
          <p>
            {{ contact_us?.sections?.data?.[0]?.desc }}
          </p>
          <!-- <div class="social-links d-flex flex-wrap align-items-center gap-5">
            <a
              v-for="setting in settings?.setting?.filter(
                (s) => !['header_logo', 'footer_logo', 'about'].includes(s.key)
              )"
              :key="setting.id"
              :href="getHref(setting)"
              target="_blank"
            >
              <img :src="getIcon(setting.key)" alt="Social Icon" />
            </a>
          </div> -->
          <h3 v-if="settings?.branches.length > 0" class="mt-5 mb-5 fw-bold">
            {{ $t("form.branches") }}:
          </h3>
          <div
            v-for="branch in settings?.branches"
            :key="branch.id"
            class="branch-info"
          >
            <p class="d-flex gap-2 mb-3">
              <img src="/src/assets/icons/location.svg" />
              <a
                :href="`https://www.google.com/maps?q=${branch.lat},${branch.lng}`"
                class="address-link"
              >
                {{ branch.address }}
              </a>
            </p>
            <h3 class="fw-bold mb-4">{{ branch.title }}</h3>
            <p class="d-flex gap-2">
              <img src="/src/assets/icons/phone.svg" />
              <a :href="`tel:+${branch.phone_code}${branch.phone}`">
                +{{ branch.phone_code }} {{ branch.phone }}
              </a>
              -
              <a
                v-if="branch.additional_phone"
                :href="`tel:+${branch.additional_phone_code}${branch.additional_phone}`"
              >
                +{{ branch.additional_phone_code }}
                {{ branch.additional_phone }}
              </a>
            </p>
          </div>
        </div>
        <div class="form-container">
          <CommuntiyForm formType="contact_us" />
        </div>
      </div>
    </section>
  </main>
  <section v-else>Loading...</section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useHead } from "@vueuse/head";
import BreadCrump from "@/reusables/bread-crump/BreadCrump.vue";
import CommuntiyForm from "@/reusables/forms/CommunityForm/CommuntiyForm.vue";
import { useSettingsStore } from "@/stores/settingStore";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const crump = ref([{ name: "menu.get-Contact", rout: "/contact" }]);
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

  await settingsStore.getSettings(); // Fetch settings data

  isLoading.value = false;
});

// Function to get the icon URL based on the key
const getIcon = (key) => {
  const icons = {
    phone: "/assets/icons/phone.svg",
    email: "/assets/icons/email-icon.svg",
    facebook: "/assets/icons/facebook-icon.svg",
    x: "/assets/icons/x-icon.svg",
    youtube: "/assets/icons/youtube.svg",
    tiktok: "/assets/icons/tiktok.svg",
    instagram: "/assets/icons/instagram.svg",
    whatsapp: "/assets/icons/whatsapp.svg",
  };
  return icons[key] || "/assets/icons/default-icon.svg"; // Default icon if key not found
};

const getHref = (setting) => {
  if (setting.key === "email") {
    return `mailto:${setting.value}`;
  } else if (setting.key === "phone") {
    return `tel:+${setting.value}`;
  } else {
    return setting.value;
  }
};

watch(
  () => contact_us.value,
  (newVal) => {
    if (newVal?.page?.data?.metadata) {
      console.log(newVal?.page?.data?.metadata);
      useHead({
        title: newVal?.page?.data?.metadata?.title,
        meta: [
          {
            name: "description",
            content: newVal?.page?.data?.metadata.description,
          },
          { name: "keywords", content: newVal?.page?.data?.metadata.keywords },
          { name: "og:title", content: newVal?.page?.data?.metadata.title },
          {
            name: "og:description",
            content: newVal?.page?.data?.metadata.description,
          },
          { name: "og:type", content: newVal?.page?.data?.metadata.type },
          // { name: "og:image", content: newVal?.page?.data?.metadata.image },
          { name: "og:url", content: window.location.href },
          {
            name: "canonical",
            content: newVal?.page?.data?.metadata.canonical_tags,
          },
        ],
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" src="./Contact.scss"></style>
