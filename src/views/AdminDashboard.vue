<template>
  <div class="dashboard">
    <h2 class="title">Overview</h2>
    <p class="subtitle">High-level snapshot of your users and performance.</p>

    <section class="cards">
      <div class="card stat-card">
        <h3>Total Users</h3>
        <p class="stat-value">128</p>
        <p class="stat-chip positive">+12 this week</p>
      </div>
      <div class="card stat-card">
        <h3>Active Today</h3>
        <p class="stat-value">34</p>
        <p class="stat-chip">26% engagement</p>
      </div>
      <div class="card stat-card">
        <h3>Average Rating</h3>
        <p class="stat-value">4.6</p>
        <p class="stat-chip">Last 30 days</p>
      </div>
    </section>

    <section class="section">
      <h3 class="section-title">User Distribution</h3>
      <div class="card distribution">
        <div class="distribution-row">
          <span>Admins</span>
          <div class="bar">
            <div class="bar-fill admin" style="width: 20%"></div>
          </div>
          <span>20%</span>
        </div>
        <div class="distribution-row">
          <span>Users</span>
          <div class="bar">
            <div class="bar-fill user" style="width: 80%"></div>
          </div>
          <span>80%</span>
        </div>
        <div class="distribution-row">
          <span>Male</span>
          <div class="bar">
            <div class="bar-fill male" style="width: 55%"></div>
          </div>
          <span>55%</span>
        </div>
        <div class="distribution-row">
          <span>Female</span>
          <div class="bar">
            <div class="bar-fill female" style="width: 45%"></div>
          </div>
          <span>45%</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h3 class="section-title">Recent Activity</h3>
      <div class="card activity">
        <div class="activity-item" v-for="item in activity" :key="item.id">
          <div class="activity-main">
            <span class="dot" :class="item.type"></span>
            <div>
              <div class="activity-title">{{ item.title }}</div>
              <div class="activity-meta">{{ item.meta }}</div>
            </div>
          </div>
          <div class="activity-time">{{ item.time }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      activity: [
        {
          id: 1,
          type: "success",
          title: "New user registered",
          meta: "john.doe@example.com · user · male",
          time: "2 min ago"
        },
        {
          id: 2,
          type: "info",
          title: "Rating submitted",
          meta: "4.8 · Support call · #3842",
          time: "18 min ago"
        },
        {
          id: 3,
          type: "warning",
          title: "Unusual inactivity detected",
          meta: "Team Bravo · last 24h",
          time: "1 hr ago"
        }
      ]
    };
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card {
  background: radial-gradient(circle at top left, rgba(61, 214, 140, 0.25), transparent),
    rgba(0, 0, 0, 0.45);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
}

.stat-card h3 {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
}

.stat-value {
  font-size: 1.9rem;
  font-weight: 700;
  margin: 0;
}

.stat-chip {
  display: inline-block;
  margin-top: 0.35rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.06);
}

.stat-chip.positive {
  color: #3dd68c;
  background: rgba(61, 214, 140, 0.15);
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
}

.distribution {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.distribution-row {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}

.bar {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.bar-fill.admin {
  background: linear-gradient(90deg, #3dd68c, #1caf4b);
}

.bar-fill.user {
  background: linear-gradient(90deg, #4f46e5, #0ea5e9);
}

.bar-fill.male {
  background: linear-gradient(90deg, #38bdf8, #1d4ed8);
}

.bar-fill.female {
  background: linear-gradient(90deg, #f472b6, #db2777);
}

.activity {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.activity-main {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.activity-title {
  font-size: 0.95rem;
  font-weight: 500;
}

.activity-meta {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.activity-time {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
}

.dot.success {
  background: #3dd68c;
}

.dot.info {
  background: #38bdf8;
}

.dot.warning {
  background: #facc15;
}

@media (max-width: 768px) {
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-time {
    align-self: flex-end;
  }
}
</style>


