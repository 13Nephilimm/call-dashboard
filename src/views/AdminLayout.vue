<template>
  <AuthCard>
    <div class="layout">
      <header class="header">
        <div class="brand">
          <img class="brand-logo" src="/images/logo.png" alt="Logo" />
          <div>
            <h1 class="brand-title">Call Dashboard</h1>
            <p class="brand-subtitle">Admin Console</p>
          </div>
        </div>

        <div class="user-info">
          <div class="user-text">
            <p class="user-name">{{ user?.name || user?.email }}</p>
            <p class="user-role">Admin · {{ user?.gender || "—" }}</p>
          </div>
          <img :src="avatarUrl" alt="Profile" class="avatar" />
        </div>
      </header>

      <nav class="nav">
        <router-link
          :to="{ name: 'admin-dashboard' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          Overview
        </router-link>
        <router-link
          :to="{ name: 'admin-users' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          Users
        </router-link>
      </nav>

      <main class="content">
        <router-view />
      </main>
    </div>
  </AuthCard>
</template>

<script>
import AuthCard from "@/components/AuthCard.vue";
import { authState } from "@/store/auth";

export default {
  name: "AdminLayout",
  components: {
    AuthCard
  },
  data() {
    return {
      authState
    };
  },
  computed: {
    user() {
      return this.authState.user;
    },
    avatarUrl() {
      const gender = this.user?.gender || "male";
      return gender === "female" ? "/images/avatar-female.png" : "/images/avatar-male.png";
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 12px;
}

.brand-title {
  font-size: 1.25rem;
  margin: 0;
}

.brand-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-text {
  text-align: right;
}

.user-name {
  margin: 0;
  font-weight: 600;
}

.user-role {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-primary);
}

.nav {
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
}

.nav-link {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.nav-link-active {
  background: var(--color-primary);
  color: var(--color-white);
}

.content {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .user-info {
    align-self: stretch;
    justify-content: space-between;
  }
}
</style>

