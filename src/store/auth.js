import { reactive } from "vue";
import { setAccessToken } from "@/services/api";

const AUTH_STORAGE_KEY = "auth";

export const authState = reactive({
  token: null,
  user: null
});

function persistAuth(token, user) {
  if (token && user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function setAuth({ token, user }) {
  authState.token = token;
  authState.user = user;
  setAccessToken(token);
  persistAuth(token, user);
}

export function clearAuth() {
  authState.token = null;
  authState.user = null;
  setAccessToken(null);
  persistAuth(null, null);
}

export function isAuthenticated() {
  return !!authState.token && !!authState.user;
}

export function isAdmin() {
  return !!authState.user && authState.user.role === "admin";
}
