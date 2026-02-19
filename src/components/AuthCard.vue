<template>
  <div class="auth-card">
    <div class="card-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthCard",
};
</script>

<style scoped>
.auth-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 32px;
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin-top: 48px;
}

.card-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: var(--color-primary);
  top: -150px;
  right: -150px;
  animation: float 10s ease-in-out infinite;
}

.blob-2 {
  width: 250px;
  height: 250px;
  background: var(--color-accent-blue);
  bottom: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite reverse;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: var(--color-accent-purple);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  animation: float 12s ease-in-out infinite;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
}

@media (max-width: 768px) {
  .auth-card {
    max-width: 100%;
  }

  .card-content {
    padding: 2rem;
  }
}
</style>
