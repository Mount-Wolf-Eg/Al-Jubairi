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
              <a :href="branch?.location" class="address-link">
                {{ branch.address }}
              </a>
            </p>
            <h4 class="fw-bold mb-4">{{ branch.title }}</h4>
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

          <h4 v-if="showApear('email') != 'false'" class="mt-5 mb-4 fw-bold">
            {{ $t("menu.get-Contact") }}:
          </h4>
          <div v-if="showApear('email') != 'false'">
            <a
              v-if="showApear('email')"
              class="social-icon d-flex gap-3"
              target="_blank"
              :href="'mailto:' + showApear('email')"
            >
              <svg
                style="width: 3rem; height: 3rem"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.17533 1.99911V1.9987C1.17533 1.35491 1.69639 0.832031 2.33366 0.832031H15.667C16.3075 0.832031 16.8337 1.35817 16.8337 1.9987V11.9987C16.8337 12.6392 16.3075 13.1654 15.667 13.1654H2.33366C1.6932 13.1654 1.16709 12.6393 1.16699 11.9989C1.16699 11.9988 1.16699 11.9988 1.16699 11.9987L1.17533 1.99911ZM15.932 4.08936L16.167 3.94249V3.66536V1.9987V1.09657L15.402 1.5747L9.00033 5.57574L2.59866 1.5747L1.83366 1.09657V1.9987V3.66536V3.94249L2.06866 4.08936L8.73533 8.25603L9.00033 8.42165L9.26533 8.25603L15.932 4.08936Z"
                  fill="#ACACAC"
                  stroke="#ACACAC"
                />
              </svg>
              <p style="color: black; cursor: pointer">
                {{ showApear("email") }}
              </p>
            </a>
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
const showApear = (name) => {
  if (settings.value && settings.value.setting) {
    const val = settings.value?.setting.find((el) => el.key == name)?.value;
    return val ? val : "false";
  }
  return {};
};
</script>

<style lang="scss" src="./Contact.scss"></style>
