<template>
  <div class="app">
    <LanguageSwitcher />
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

export default {
  name: "App",
  components: {
    LanguageSwitcher,
  },
};
</script>

<style scoped>
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
