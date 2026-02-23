<template>
  <div class="app">
    <div class="top-bar">
      <LanguageSwitcher />
      <button
        v-if="isAuthenticated"
        class="logout-btn"
        @click="handleLogout"
      >
        {{ $t("auth.logout") }}
      </button>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Decorative elements -->
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { authState, clearAuth, isAuthenticated } from "@/store/auth";

export default {
  name: "App",
  components: {
    LanguageSwitcher,
  },
  computed: {
    isAuthenticated() {
      return isAuthenticated();
    },
  },
  setup() {
    return { authState };
  },
  methods: {
    handleLogout() {
      clearAuth();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 100;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .top-bar {
    top: 1rem;
    right: 1rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}

.app {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.decoration {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  z-index: -1;
  opacity: 0.15;
}

.decoration-1 {
  width: 500px;
  height: 500px;
  background: var(--color-primary);
  top: -250px;
  left: -250px;
  animation: float 20s ease-in-out infinite;
}

.decoration-2 {
  width: 600px;
  height: 600px;
  background: var(--color-accent-purple);
  bottom: -300px;
  right: -300px;
  animation: float 25s ease-in-out infinite reverse;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .decoration-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
  }

  .decoration-2 {
    width: 400px;
    height: 400px;
    bottom: -200px;
    right: -200px;
  }
}
</style>
