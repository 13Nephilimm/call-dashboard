import { createApp } from "vue";
import { reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import en from "./locales/en.json";
import ka from "./locales/ka.json";
import { setAuth, clearAuth } from "./store/auth";
import { setAccessToken } from "./services/api";
import { fetchMe } from "./services/api";
import { initTheme } from "./store/theme";

// Reactive i18n - locale changes trigger re-renders
const savedLocale = localStorage.getItem("locale") || "en";
const i18n = reactive({
  locale: ["en", "ka"].includes(savedLocale) ? savedLocale : "en",
  messages: { en, ka }
});

function setLocale(locale) {
  if (["en", "ka"].includes(locale)) {
    i18n.locale = locale;
    localStorage.setItem("locale", locale);
  }
}

const app = createApp(App);

app.config.globalProperties.$t = function (key) {
  return (
    key.split(".").reduce((obj, i) => obj?.[i], i18n.messages[i18n.locale]) ||
    key
  );
};

app.provide("i18n", i18n);
app.provide("setLocale", setLocale);
app.config.globalProperties.$i18n = i18n;
app.config.globalProperties.$setLocale = setLocale;

// Restore auth from localStorage before mount
const storedAuth = localStorage.getItem("auth");
if (storedAuth) {
  try {
    const { token, user } = JSON.parse(storedAuth);
    if (token && user) {
      setAccessToken(token);
      setAuth({ token, user });
    }
  } catch {
    localStorage.removeItem("auth");
  }
}

initTheme();
app.use(router);
app.mount("#app");

// Validate token in background - if invalid, clear and redirect
if (storedAuth) {
  try {
    const { token } = JSON.parse(storedAuth);
    if (token) {
      fetchMe().catch(() => {
        clearAuth();
        router.push({ name: "login" });
      });
    }
  } catch {}
}
