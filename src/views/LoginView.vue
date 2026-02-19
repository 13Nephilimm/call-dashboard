<template>
  <AuthCard>
    <div class="login-container">
      <div class="header">
        <h1 class="title">{{ $t("auth.welcomeBack") }}</h1>
        <p class="subtitle">{{ $t("auth.signIn") }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <AuthInput
          id="email"
          :label="$t('auth.email')"
          type="email"
          :placeholder="$t('placeholders.enterEmail')"
          v-model="form.email"
        />

        <AuthInput
          id="password"
          :label="$t('auth.password')"
          type="password"
          :placeholder="$t('placeholders.enterPassword')"
          v-model="form.password"
        />

        <button type="submit" class="submit-btn">
          {{ $t("auth.login") }}
        </button>
      </form>

      <div class="divider"></div>

      <div class="social-login">
        <img src="/public/images/logo.png" alt="logo" class="logo" />
      </div>
    </div>
  </AuthCard>
</template>

<script>
import AuthCard from "@/components/AuthCard.vue";
import AuthInput from "@/components/AuthInput.vue";
import { login } from "@/services/api";
import { setAuth, isAdmin } from "@/store/auth";

export default {
  name: "LoginView",
  components: {
    AuthCard,
    AuthInput,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.error = "";
      this.loading = true;
      try {
        const res = await login(this.form.email, this.form.password);
        setAuth({ token: res.token, user: res.user });
        if (isAdmin()) {
          this.$router.push({ name: "admin" });
        } else {
          this.$router.push({ name: "dashboard" });
        }
      } catch (err) {
        if (err.status === 401) {
          this.error = "Invalid email or password.";
        } else {
          this.error = "Login failed. Please try again.";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--color-white) 0%,
    var(--color-primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  animation: fadeIn 0.6s ease-out;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.forgot-password {
  text-align: right;
}

.forgot-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: var(--color-primary);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.logo {
  width: 50%;
}

.error-text {
  margin-top: 0.75rem;
  color: #ff6b6b;
  font-size: 0.9rem;
}

.submit-btn:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(28, 175, 75, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.divider-text {
  position: relative;
  padding: 0 1rem;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.social-login {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.footer {
  text-align: center;
}

.footer-text {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.footer-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-primary-light);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .social-btn {
    width: 44px;
    height: 44px;
  }
}
</style>
