<template>
  <div class="language-switcher">
    <button
      class="lang-btn"
      :class="{ active: $i18n.locale === 'en' }"
      @click="switchLanguage('en')"
    >
      EN
    </button>
    <span class="separator">|</span>
    <button
      class="lang-btn"
      :class="{ active: $i18n.locale === 'ka' }"
      @click="switchLanguage('ka')"
    >
      KA
    </button>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      // Force update to trigger re-render with new translations
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
  z-index: 10;
}

.lang-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  color: var(--color-text-primary);
}

.lang-btn.active {
  color: var(--color-primary);
  background: rgba(28, 175, 75, 0.1);
}

.separator {
  color: var(--color-border);
}

@media (max-width: 768px) {
  .language-switcher {
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
  }

  .lang-btn {
    font-size: 0.8rem;
  }
}
</style>
