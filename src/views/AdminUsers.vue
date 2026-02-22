<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h2 class="page-title">User Management</h2>
        <p class="page-subtitle">
          Create, manage, and monitor all operator accounts
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <div class="stat-pill">
          <span class="stat-label">Total</span>
          <span class="stat-value">{{ filteredUsers.length }}</span>
        </div>
        <div class="stat-pill">
          <span class="stat-label">Admins</span>
          <span class="stat-value">{{ usersByRole.admin }}</span>
        </div>
        <div class="stat-pill">
          <span class="stat-label">Operators</span>
          <span class="stat-value">{{ usersByRole.user }}</span>
        </div>
      </div>
    </div>

    <!-- Create User Card -->
    <div class="create-card">
      <div class="create-header">
        <h3 class="create-title">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          Create New Operator
        </h3>
        <span class="create-badge">Admin Only</span>
      </div>

      <form class="create-form" @submit.prevent="handleCreateUser">
        <div class="form-grid">
          <!-- Email -->
          <div class="form-field">
            <label class="field-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4L8 8L14 4M2 12H14V4H2V12Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              v-model="newUser.email"
              placeholder="operator@company.com"
              class="field-input"
              :class="{ 'field-error': createError && !newUser.email }"
            />
          </div>

          <!-- Password -->
          <div class="form-field">
            <label class="field-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 8H12M4 8V13H12V8M4 8V5C4 3.5 5 2 8 2C11 2 12 3.5 12 5V8"
                  stroke="currentColor"
                  stroke-width="1.2"
                />
              </svg>
              Password
            </label>
            <input
              type="password"
              v-model="newUser.password"
              placeholder="••••••••"
              class="field-input"
              :class="{ 'field-error': createError && !newUser.password }"
            />
          </div>

          <!-- Full Name -->
          <div class="form-field">
            <label class="field-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                />
                <path
                  d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              v-model="newUser.name"
              placeholder="John Doe"
              class="field-input"
            />
          </div>

          <!-- Role Selection -->
          <div class="form-field">
            <label class="field-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 12L8 14L14 12M2 8L8 10L14 8M8 2V14M8 2L14 5V11L8 14M8 2L2 5V11L8 14"
                  stroke="currentColor"
                  stroke-width="1.2"
                />
              </svg>
              Role
            </label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" value="user" v-model="newUser.role" />
                <span class="radio-label">Operator</span>
              </label>
              <label class="radio-option">
                <input type="radio" value="admin" v-model="newUser.role" />
                <span class="radio-label">Admin</span>
              </label>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="form-field">
            <label class="field-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="5"
                  r="3"
                  stroke="currentColor"
                  stroke-width="1.2"
                />
                <path
                  d="M8 8V14M5 11H11"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
              Gender
            </label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" value="male" v-model="newUser.gender" />
                <span class="radio-label">Male</span>
              </label>
              <label class="radio-option">
                <input type="radio" value="female" v-model="newUser.gender" />
                <span class="radio-label">Female</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="resetCreateForm">
            Clear
          </button>
          <button type="submit" class="btn-primary" :disabled="creatingUser">
            <svg
              v-if="creatingUser"
              class="spin"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                stroke-width="1.5"
                fill="none"
                stroke-dasharray="28 28"
              />
            </svg>
            <span>{{ creatingUser ? "Creating..." : "Create Operator" }}</span>
          </button>
        </div>

        <!-- Status Messages -->
        <transition name="fade">
          <div v-if="createError" class="message error">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                stroke-width="1.2"
              />
              <path
                d="M8 5V8M8 11H8.01"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            {{ createError }}
          </div>
        </transition>

        <transition name="fade">
          <div v-if="createSuccess" class="message success">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                stroke-width="1.2"
              />
              <path
                d="M5 8L7 10L11 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            Operator created successfully
          </div>
        </transition>
      </form>
    </div>

    <!-- Filters & Search Section -->
    <div class="filters-section">
      <div class="search-wrapper">
        <svg
          class="search-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle
            cx="9"
            cy="9"
            r="5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M13 13L17 17"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <input
          type="text"
          v-model="filters.search"
          placeholder="Search by name or email..."
          class="search-input"
        />
        <button
          v-if="filters.search"
          class="search-clear"
          @click="filters.search = ''"
        >
          ✕
        </button>
      </div>

      <div class="filter-group">
        <!-- Role Filter -->
        <div class="filter-dropdown">
          <button class="filter-btn" @click="toggleFilter('role')">
            <span>Role</span>
            <span class="filter-badge" v-if="filters.role.length">{{
              filters.role.length
            }}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              :class="{ rotated: openFilter === 'role' }"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div v-if="openFilter === 'role'" class="filter-menu">
            <label class="filter-option">
              <input type="checkbox" value="admin" v-model="filters.role" />
              <span class="filter-option-label">Admin</span>
              <span class="filter-option-count">{{ usersByRole.admin }}</span>
            </label>
            <label class="filter-option">
              <input type="checkbox" value="user" v-model="filters.role" />
              <span class="filter-option-label">Operator</span>
              <span class="filter-option-count">{{ usersByRole.user }}</span>
            </label>
          </div>
        </div>

        <!-- Gender Filter -->
        <div class="filter-dropdown">
          <button class="filter-btn" @click="toggleFilter('gender')">
            <span>Gender</span>
            <span class="filter-badge" v-if="filters.gender.length">{{
              filters.gender.length
            }}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              :class="{ rotated: openFilter === 'gender' }"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div v-if="openFilter === 'gender'" class="filter-menu">
            <label class="filter-option">
              <input type="checkbox" value="male" v-model="filters.gender" />
              <span class="filter-option-label">Male</span>
              <span class="filter-option-count">{{ usersByGender.male }}</span>
            </label>
            <label class="filter-option">
              <input type="checkbox" value="female" v-model="filters.gender" />
              <span class="filter-option-label">Female</span>
              <span class="filter-option-count">{{
                usersByGender.female
              }}</span>
            </label>
          </div>
        </div>

        <!-- Rating Filter -->
        <div class="filter-dropdown">
          <button class="filter-btn" @click="toggleFilter('rating')">
            <span>Min Rating</span>
            <span class="filter-badge" v-if="filters.minRating > 0"
              >{{ filters.minRating }}+ ★</span
            >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              :class="{ rotated: openFilter === 'rating' }"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div v-if="openFilter === 'rating'" class="filter-menu rating-menu">
            <div class="rating-slider">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                v-model.number="filters.minRating"
                @input="updateRatingPreview"
              />
              <div class="rating-preview">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="rating-star"
                  :class="{ filled: n <= filters.minRating }"
                  >★</span
                >
                <span class="rating-value">{{
                  filters.minRating.toFixed(1)
                }}</span>
              </div>
            </div>
            <button class="filter-clear" @click="filters.minRating = 0">
              Clear
            </button>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="active-filters">
          <button class="clear-filters" @click="clearAllFilters">
            Clear all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                stroke-width="1.2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Users List -->
    <div class="users-section">
      <div class="users-header">
        <h3 class="users-title">
          All Operators
          <span class="users-count">{{ filteredUsers.length }}</span>
        </h3>
        <div class="sort-dropdown">
          <select v-model="sortBy" class="sort-select">
            <option value="email">Sort by Email</option>
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loadingUsers" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading operators...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredUsers.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="4 4"
          />
          <path
            d="M24 16V24M24 32H24.02"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <h4>No operators found</h4>
        <p>Try adjusting your filters or create a new operator</p>
      </div>

      <!-- Users Grid -->
      <div v-else class="users-grid">
        <transition-group name="list" tag="div" class="users-list">
          <div v-for="user in sortedUsers" :key="user.id" class="user-card">
            <div class="user-card-header">
              <img
                :src="
                  user.gender === 'female'
                    ? '/images/female.png'
                    : '/images/male.png'
                "
                :alt="user.name"
                class="user-avatar"
              />
              <div class="user-badges">
                <span class="role-badge" :class="user.role">
                  {{ user.role === "admin" ? "Admin" : "Operator" }}
                </span>
                <span class="gender-badge" :class="user.gender">
                  {{ user.gender }}
                </span>
              </div>
            </div>

            <div class="user-card-body">
              <h4 class="user-name">{{ user.name || "No name set" }}</h4>
              <p class="user-email">{{ user.email }}</p>

              <!-- Rating Display -->
              <div class="user-rating" v-if="user.role != 'admin'">
                <div class="rating-stars">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="star"
                    :class="{ filled: n <= (user.rating || 0) }"
                    >★</span
                  >
                </div>
                <span class="rating-number">{{
                  (user.rating || 0).toFixed(1)
                }}</span>
              </div>

              <!-- Performance Metrics -->
              <div class="user-metrics" v-if="user.role != 'admin'">
                <div class="metric">
                  <span class="metric-label">Chats</span>
                  <span class="metric-value">{{ user.totalChats || 0 }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Avg Response</span>
                  <span class="metric-value">{{
                    user.avgResponseTime || "—"
                  }}</span>
                </div>
              </div>
            </div>

            <div class="user-card-footer">
              <button
                class="view-profile-btn"
                @click="viewUserProfile(user.id)"
              >
                View Profile
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { adminCreateUser, adminListUsers } from "@/services/api";

export default {
  name: "AdminUsers",
  data() {
    return {
      // Users data
      users: [],
      loadingUsers: false,

      // Create user form
      newUser: {
        email: "",
        password: "",
        name: "",
        role: "user",
        gender: "male",
      },
      creatingUser: false,
      createError: "",
      createSuccess: false,

      // Filters
      filters: {
        search: "",
        role: [],
        gender: [],
        minRating: 0,
      },

      // UI state
      openFilter: null,
      sortBy: "email",
    };
  },
  async created() {
    await this.loadUsers();
  },
  computed: {
    // Filter users based on all criteria
    filteredUsers() {
      return this.users.filter((user) => {
        // Search filter
        if (this.filters.search) {
          const searchLower = this.filters.search.toLowerCase();
          const nameMatch = user.name?.toLowerCase().includes(searchLower);
          const emailMatch = user.email.toLowerCase().includes(searchLower);
          if (!nameMatch && !emailMatch) return false;
        }

        // Role filter
        if (
          this.filters.role.length > 0 &&
          !this.filters.role.includes(user.role)
        ) {
          return false;
        }

        // Gender filter
        if (
          this.filters.gender.length > 0 &&
          !this.filters.gender.includes(user.gender)
        ) {
          return false;
        }

        // Rating filter
        if (
          this.filters.minRating > 0 &&
          (user.rating || 0) < this.filters.minRating
        ) {
          return false;
        }

        return true;
      });
    },

    // Sort users
    sortedUsers() {
      return [...this.filteredUsers].sort((a, b) => {
        switch (this.sortBy) {
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          case "role":
            return a.role.localeCompare(b.role);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          default: // email
            return a.email.localeCompare(b.email);
        }
      });
    },

    // Stats
    usersByRole() {
      return {
        admin: this.users.filter((u) => u.role === "admin").length,
        user: this.users.filter((u) => u.role === "user").length,
      };
    },

    usersByGender() {
      return {
        male: this.users.filter((u) => u.gender === "male").length,
        female: this.users.filter((u) => u.gender === "female").length,
      };
    },

    hasActiveFilters() {
      return (
        this.filters.search ||
        this.filters.role.length > 0 ||
        this.filters.gender.length > 0 ||
        this.filters.minRating > 0
      );
    },
  },
  methods: {
    async loadUsers() {
      this.loadingUsers = true;
      try {
        const res = await adminListUsers();
        // Add mock rating data for demonstration
        this.users = (res.users || []).map((user) => ({
          ...user,
          rating: Math.random() * 2 + 3, // Random rating between 3-5
          totalChats: Math.floor(Math.random() * 500),
          avgResponseTime: Math.floor(Math.random() * 180) + 30 + "s",
        }));
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
          gender: this.newUser.gender,
        });

        this.createSuccess = true;
        this.resetCreateForm();
        await this.loadUsers();

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          this.createSuccess = false;
        }, 3000);
      } catch (err) {
        if (err.payload?.error === "email_already_exists") {
          this.createError = "Email already exists.";
        } else {
          this.createError = "Failed to create user.";
        }
      } finally {
        this.creatingUser = false;
      }
    },

    resetCreateForm() {
      this.newUser = {
        email: "",
        password: "",
        name: "",
        role: "user",
        gender: "male",
      };
      this.createError = "";
    },

    toggleFilter(filter) {
      this.openFilter = this.openFilter === filter ? null : filter;
    },

    updateRatingPreview() {
      // Force reactivity for rating preview
      this.filters.minRating = Number(this.filters.minRating);
    },

    clearAllFilters() {
      this.filters = {
        search: "",
        role: [],
        gender: [],
        minRating: 0,
      };
    },

    viewUserProfile(userId) {
      // Navigate to user profile
      this.$router.push({ name: "user-profile", params: { id: userId } });
    },
  },
  watch: {
    // Close filter dropdown when clicking outside
    openFilter(val) {
      if (val) {
        const handler = (e) => {
          if (!e.target.closest(".filter-dropdown")) {
            this.openFilter = null;
            document.removeEventListener("click", handler);
          }
        };
        setTimeout(() => {
          document.addEventListener("click", handler);
        }, 0);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.75rem;
  margin: 0 0 0.25rem;
  background: linear-gradient(
    135deg,
    var(--color-white) 0%,
    var(--color-primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.95rem;
}

.quick-stats {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  border-radius: 30px;
  border: 1px solid var(--color-border);
}

.stat-pill {
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}

.stat-value {
  font-weight: 600;
  color: var(--color-primary);
}

/* Create User Card */
.create-card {
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.create-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.create-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin: 0;
  color: var(--color-primary);
}

.create-badge {
  background: rgba(28, 175, 75, 0.1);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.field-input {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.field-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(28, 175, 75, 0.1);
}

.field-input.field-error {
  border-color: #ef4444;
}

.radio-group {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 30px;
}

.radio-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-option:has(input:checked) {
  background: var(--color-primary);
}

.radio-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.radio-option:has(input:checked) .radio-label {
  color: var(--color-white);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(28, 175, 75, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}

/* Messages */
.message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  animation: slideIn 0.3s ease;
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.message.success {
  background: rgba(28, 175, 75, 0.1);
  color: var(--color-primary);
  border: 1px solid rgba(28, 175, 75, 0.2);
}

/* Filters Section */
.filters-section {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-wrapper {
  position: relative;
  width: 100%;
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
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.1);
}

.search-clear {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
}

.search-clear:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.1);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}

.filter-btn svg {
  transition: transform 0.2s ease;
}

.filter-btn svg.rotated {
  transform: rotate(180deg);
}

.filter-badge {
  background: var(--color-primary);
  color: var(--color-white);
  padding: 0.15rem 0.4rem;
  border-radius: 20px;
  font-size: 0.7rem;
  min-width: 1.2rem;
  text-align: center;
}

.filter-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 200px;
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.filter-option:hover {
  background: rgba(255, 255, 255, 0.05);
}

.filter-option input[type="checkbox"] {
  accent-color: var(--color-primary);
}

.filter-option-label {
  flex: 1;
  font-size: 0.9rem;
}

.filter-option-count {
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}

.rating-menu {
  width: 250px;
  padding: 1rem;
}

.rating-slider {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rating-slider input[type="range"] {
  width: 100%;
  accent-color: var(--color-primary);
}

.rating-preview {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: center;
}

.rating-star {
  color: rgba(255, 255, 255, 0.2);
  font-size: 1.2rem;
}

.rating-star.filled {
  color: #fbbf24;
}

.rating-value {
  margin-left: 0.5rem;
  font-weight: 600;
  color: var(--color-primary);
}

.filter-clear {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-clear:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}

.active-filters {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.clear-filters:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Users Section */
.users-section {
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 1.5rem;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.users-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  margin: 0;
}

.users-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--color-primary);
}

.sort-select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.sort-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

/* Users Grid */
.users-grid {
  min-height: 400px;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.user-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.user-card-header {
  position: relative;
  padding: 1.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(28, 175, 75, 0.1) 0%,
    transparent 100%
  );
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  margin-bottom: 0.75rem;
}

.user-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.role-badge,
.gender-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-badge.admin {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
}

.role-badge.user {
  background: linear-gradient(135deg, #3b82f6, #0ea5e9);
  color: white;
}

.gender-badge.male {
  background: linear-gradient(135deg, #38bdf8, #1d4ed8);
  color: white;
}

.gender-badge.female {
  background: linear-gradient(135deg, #f472b6, #db2777);
  color: white;
}

.user-card-body {
  padding: 1rem;
  text-align: center;
}

.user-name {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

.user-email {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.user-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating-stars {
  display: flex;
  gap: 0.15rem;
}

.star {
  color: rgba(255, 255, 255, 0.2);
  font-size: 1rem;
}

.star.filled {
  color: #fbbf24;
}

.rating-number {
  font-weight: 600;
  color: var(--color-primary);
}

.user-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.user-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--color-border);
}

.user-id {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  font-family: monospace;
}

.view-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.view-profile-btn:hover {
  background: rgba(28, 175, 75, 0.1);
  gap: 0.5rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.empty-state svg {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.empty-state h4 {
  margin: 0 0 0.25rem;
  color: var(--color-text-primary);
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

/* Animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .users-list {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-dropdown {
    width: 100%;
  }

  .filter-btn {
    width: 100%;
    justify-content: space-between;
  }

  .filter-menu {
    width: 100%;
  }

  .users-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .sort-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .create-card {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .radio-group {
    flex-direction: column;
  }
}
</style>
