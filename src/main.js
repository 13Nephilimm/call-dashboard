import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

// Import locale files
import en from "./locales/en.json";
import ka from "./locales/ka.json";

// Simple i18n implementation with external files
const i18n = {
  locale: "en",
  messages: {
    en,
    ka,
  },
};

const app = createApp(App);

// Add i18n to global properties correctly
app.config.globalProperties.$t = function (key) {
  return (
    key.split(".").reduce((obj, i) => obj?.[i], i18n.messages[i18n.locale]) ||
    key
  );
};

// Make i18n available in components
app.provide("i18n", i18n);
app.config.globalProperties.$i18n = i18n;

app.use(router);
app.mount("#app");
