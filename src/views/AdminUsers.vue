<template>
  <div class="dashboard">
    <h2 class="title">Manage Users</h2>
    <p class="subtitle">Create new users and view all existing accounts.</p>

    <section class="section">
      <h3 class="section-title">Create User</h3>
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
          <div class="field">
            <label for="new-role">Role</label>
            <select id="new-role" v-model="newUser.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="field">
            <label for="new-gender">Gender</label>
            <select id="new-gender" v-model="newUser.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
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
      <h3 class="section-title">All Users</h3>
      <div v-if="loadingUsers" class="card">Loading users…</div>
      <div v-else-if="users.length === 0" class="card">No users yet.</div>
      <ul v-else class="users">
        <li v-for="u in users" :key="u.id" class="card user-item">
          <div class="user-main">
            <img
              :src="u.gender === 'female' ? '/images/avatar-female.png' : '/images/avatar-male.png'"
              alt="Avatar"
              class="avatar"
            />
            <div>
              <div class="user-email">{{ u.email }}</div>
              <div class="user-meta">
                <span>{{ u.role }}</span>
                <span>·</span>
                <span>{{ u.gender }}</span>
              </div>
            </div>
          </div>
          <div class="user-extra">
            <div><strong>ID:</strong> {{ u.id }}</div>
            <div><strong>Name:</strong> {{ u.name || "—" }}</div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput.vue";
import { adminCreateUser, adminListUsers } from "@/services/api";

export default {
  name: "AdminUsers",
  components: {
    AuthInput
  },
  data() {
    return {
      users: [],
      loadingUsers: false,
      newUser: {
        email: "",
        password: "",
        name: "",
        role: "user",
        gender: "male"
      },
      creatingUser: false,
      createError: "",
      createSuccess: false
    };
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
          role: this.newUser.role,
          gender: this.newUser.gender
        });
        this.createSuccess = true;
        this.newUser.email = "";
        this.newUser.password = "";
        this.newUser.name = "";
        this.newUser.role = "user";
        this.newUser.gender = "male";
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
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
}

.section {
  margin-bottom: 1.75rem;
}

.section-title {
  font-size: 1.15rem;
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

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
}

.field select {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.user-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
}

.user-email {
  font-weight: 600;
}

.user-meta {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  display: flex;
  gap: 0.35rem;
}

.user-extra {
  font-size: 0.9rem;
  text-align: right;
  display: grid;
  gap: 0.1rem;
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-extra {
    text-align: left;
  }
}
</style>

