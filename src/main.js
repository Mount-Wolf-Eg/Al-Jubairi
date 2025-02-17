import "./assets/main.scss";
import "./assets/media-queries.scss";
import "normalize.css";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// vue use
import { createHead } from "@vueuse/head";
const head = createHead();

// toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// language
import { createI18n } from "vue-i18n";
import AR from "./locale/AR.json";
import EN from "./locale/EN.json";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
let lang = sessionStorage.getItem("lang") || "ar";
const i18n = createI18n({
  locale: lang,
  messages: {
    en: EN,
    ar: AR,
  },
});

app.use(createPinia());
app.use(head);
app.use(router);
app.use(Toast);
app.use(i18n);
app.use(VueAwesomePaginate);

app.mount("#app");
