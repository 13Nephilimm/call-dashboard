<template>
  <AuthCard>
    <div class="dashboard">
      <h1 class="title">User Dashboard</h1>
      <p class="subtitle">
        Logged in as <strong>{{ user?.email }}</strong>
        <span v-if="user?.role">({{ user.role }})</span>
      </p>

      <section class="section">
        <h2 class="section-title">Profile</h2>
        <div class="card">
          <p><strong>ID:</strong> {{ user?.id }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <p><strong>Role:</strong> {{ user?.role }}</p>
          <p><strong>Name:</strong> {{ user?.name || "—" }}</p>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">My Ratings</h2>
        <div v-if="loadingRatings" class="card">Loading ratings…</div>
        <div v-else-if="ratings.length === 0" class="card">No ratings yet.</div>
        <ul v-else class="ratings">
          <li v-for="r in ratings" :key="r.id" class="card rating-item">
            <div><strong>Score:</strong> {{ r.score }}</div>
            <div><strong>Note:</strong> {{ r.note || "—" }}</div>
            <div><strong>Created:</strong> {{ r.created_at }}</div>
          </li>
        </ul>
      </section>
    </div>
  </AuthCard>
</template>

<script>
import AuthCard from "@/components/AuthCard.vue";
import { authState } from "@/store/auth";
import { fetchMyRatings } from "@/services/api";

export default {
  name: "UserDashboard",
  components: { AuthCard },
  data() {
    return {
      authState,
      ratings: [],
      loadingRatings: false
    };
  },
  computed: {
    user() {
      return this.authState.user;
    }
  },
  async created() {
    this.loadingRatings = true;
    try {
      const res = await fetchMyRatings();
      this.ratings = res.ratings || [];
    } catch (err) {
      console.error("Failed to load ratings", err);
    } finally {
      this.loadingRatings = false;
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
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
}

.ratings {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}

.rating-item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}
</style>

