<template>
  <AuthCard>
    <div class="dashboard">
      <h1 class="title">Admin Dashboard</h1>
      <p class="subtitle">
        Logged in as admin <strong>{{ user?.email }}</strong>
      </p>

      <section class="section">
        <h2 class="section-title">Create User</h2>
        <form class="form" @submit.prevent="handleCreateUser">
          <div class="field-row">
            <AuthInput id="new-email" label="Email" type="email" v-model="newUser.email" />
            <AuthInput
              id="new-password"
              label="Password"
              type="password"
              v-model="newUser.password"
            />
          </div>

          <div class="field-row">
            <AuthInput id="new-name" label="Name" type="text" v-model="newUser.name" />
            <div class="role-select">
              <label for="new-role">Role</label>
              <select id="new-role" v-model="newUser.role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button class="submit-btn" type="submit" :disabled="creatingUser">
            {{ creatingUser ? "Creating..." : "Create User" }}
          </button>

          <p v-if="createError" class="error-text">{{ createError }}</p>
          <p v-if="createSuccess" class="success-text">User created successfully.</p>
        </form>
      </section>

      <section class="section">
        <h2 class="section-title">All Users</h2>
        <div v-if="loadingUsers" class="card">Loading users…</div>
        <div v-else-if="users.length === 0" class="card">No users yet.</div>
        <ul v-else class="users">
          <li v-for="u in users" :key="u.id" class="card user-item">
            <div><strong>ID:</strong> {{ u.id }}</div>
            <div><strong>Email:</strong> {{ u.email }}</div>
            <div><strong>Role:</strong> {{ u.role }}</div>
            <div><strong>Name:</strong> {{ u.name || "—" }}</div>
          </li>
        </ul>
      </section>
    </div>
  </AuthCard>
</template>

<script>
import AuthCard from "@/components/AuthCard.vue";
import AuthInput from "@/components/AuthInput.vue";
import { authState } from "@/store/auth";
import { adminCreateUser, adminListUsers } from "@/services/api";

export default {
  name: "AdminDashboard",
  components: {
    AuthCard,
    AuthInput
  },
  data() {
    return {
      authState,
      users: [],
      loadingUsers: false,
      newUser: {
        email: "",
        password: "",
        name: "",
        role: "user"
      },
      creatingUser: false,
      createError: "",
      createSuccess: false
    };
  },
  computed: {
    user() {
      return this.authState.user;
    }
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.loadingUsers = true;
      try {
        const res = await adminListUsers();
        this.users = res.users || [];
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        this.loadingUsers = false;
      }
    },
    async handleCreateUser() {
      this.creatingUser = true;
      this.createError = "";
      this.createSuccess = false;
      try {
        if (!this.newUser.email || !this.newUser.password) {
          this.createError = "Email and password are required.";
          return;
        }
        await adminCreateUser({
          email: this.newUser.email,
          password: this.newUser.password,
          name: this.newUser.name || undefined,
          role: this.newUser.role
        });
        this.createSuccess = true;
        this.newUser.email = "";
        this.newUser.password = "";
        this.newUser.name = "";
        this.newUser.role = "user";
        await this.loadUsers();
      } catch (err) {
        if (err.payload?.error === "email_already_exists") {
          this.createError = "Email already exists.";
        } else {
          this.createError = "Failed to create user.";
        }
      } finally {
        this.creatingUser = false;
      }
    }
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.section {
  margin-bottom: 1.75rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.role-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
}

.role-select select {
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-text-primary);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

.error-text {
  color: #ff6b6b;
  font-size: 0.9rem;
}

.success-text {
  color: #3dd68c;
  font-size: 0.9rem;
}

.users {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}

.card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
}

.user-item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
}
</style>

