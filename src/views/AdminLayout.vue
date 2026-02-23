<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-text">
            <img src="/images/logo.png" alt="logo" style="width: 100%" />
          </div>
        </div>
      </div>

      <nav class="nav">
        <router-link
          :to="{ name: 'admin-dashboard' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <svg
            class="nav-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2 10L4 8M18 10L16 8M10 2L2 8V16H18V8L10 2Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <circle
              cx="10"
              cy="13"
              r="2"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
          <span>{{ $t("nav.overview") }}</span>
        </router-link>

        <router-link
          :to="{ name: 'admin-users' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <svg
            class="nav-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M17 18C17 14.6863 14.3137 12 10 12C5.68629 12 3 14.6863 3 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span>{{ $t("nav.operators") }}</span>
          <span class="nav-badge">24</span>
        </router-link>

        <router-link class="nav-link" active-class="nav-link-active">
          <svg
            class="nav-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 2L12.2451 7.90983L18.5106 8.1459L13.7565 11.9402L15.4908 17.8541L10 14.12L4.50917 17.8541L6.2435 11.9402L1.48944 8.1459L7.7549 7.90983L10 2Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
          <span>{{ $t("nav.ratings") }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <img :src="avatarUrl" alt="Profile" class="avatar" />
          <div class="user-text">
            <p class="user-name">{{ user?.name || user?.email }}</p>
            <p class="user-role">Admin · {{ user?.gender || "—" }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <header class="top-bar">
        <button class="menu-toggle" @click="toggleSidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </header>

      <!-- Page Content -->
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { authState } from "@/store/auth";

export default {
  name: "AdminLayout",
  data() {
    return {
      authState,
      sidebarOpen: true,
    };
  },
  computed: {
    user() {
      return this.authState.user;
    },
    avatarUrl() {
      const gender = this.user?.gender || "male";
      return gender === "female" ? "/images/female.png" : "/images/male.png";
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      document.documentElement.style.setProperty(
        "--sidebar-width",
        this.sidebarOpen ? "260px" : "80px",
      );
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-background);
  position: relative;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-width, 260px);
  background: rgba(6, 39, 51, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.brand-text {
  flex: 1;
}

.brand-title {
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.2;
}

.brand-title span {
  color: var(--color-primary);
}

.brand-subtitle {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* Navigation */
.nav {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
}

.nav-link-active {
  background: rgba(28, 175, 75, 0.1);
  color: var(--color-primary);
}

.nav-icon {
  flex-shrink: 0;
}

.nav-badge {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid var(--color-primary);
}

.user-text {
  flex: 1;
  min-width: 0;
}

.user-name {
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width, 260px);
  transition: margin-left 0.3s ease;
}

/* Top Bar */
.top-bar {
  height: 70px;
  background: rgba(6, 39, 51, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 20;
}

.menu-toggle {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: none;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
}

.top-bar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.search {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  color: var(--color-text-primary);
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.1);
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
}

.notification-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  transform: translate(25%, -25%);
}

.content {
  padding: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(calc(var(--sidebar-width, 260px) * -1));
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .search {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 0 1rem;
  }

  .content {
    padding: 1rem;
  }

  .search {
    display: none;
  }
}
</style>
