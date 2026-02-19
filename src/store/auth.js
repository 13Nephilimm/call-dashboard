import { reactive } from "vue";
import { setAccessToken } from "@/services/api";

export const authState = reactive({
  token: null,
  user: null
});

export function setAuth({ token, user }) {
  authState.token = token;
  authState.user = user;
  setAccessToken(token);
}

export function clearAuth() {
  authState.token = null;
  authState.user = null;
  setAccessToken(null);
}

export function isAuthenticated() {
  return !!authState.token && !!authState.user;
}

export function isAdmin() {
  return !!authState.user && authState.user.role === "admin";
}

