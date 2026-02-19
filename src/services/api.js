const API_BASE_URL = "http://localhost:3001";

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token || null;
}

export function getAccessToken() {
  return accessToken;
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.error || res.statusText || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password }
  });
}

export function fetchMe() {
  return request("/auth/me", {
    method: "GET",
    auth: true
  });
}

export function fetchMyRatings() {
  return request("/users/me/ratings", {
    method: "GET",
    auth: true
  });
}

export function adminListUsers() {
  return request("/admin/users", {
    method: "GET",
    auth: true
  });
}

export function adminCreateUser(payload) {
  return request("/admin/users", {
    method: "POST",
    body: payload,
    auth: true
  });
}

