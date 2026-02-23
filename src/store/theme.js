import { reactive } from "vue";

const THEME_STORAGE_KEY = "theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : getSystemTheme();

export const themeState = reactive({
  theme: initialTheme,
});

export function setTheme(theme) {
  if (theme !== "dark" && theme !== "light") return;
  themeState.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme() {
  setTheme(themeState.theme === "dark" ? "light" : "dark");
}

export function initTheme() {
  document.documentElement.setAttribute("data-theme", themeState.theme);
}
