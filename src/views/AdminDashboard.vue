<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1 class="page-title">{{ $t("admin.operatorPerformance") }}</h1>
        <p class="page-subtitle">
          {{ $t("admin.operatorPerformanceSubtitle") }}
        </p>
      </div>

      <div class="date-range">
        <button class="date-range-btn active">{{ $t("admin.today") }}</button>
        <button class="date-range-btn">{{ $t("admin.week") }}</button>
        <button class="date-range-btn">{{ $t("admin.month") }}</button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div
          class="kpi-icon"
          style="
            background: rgba(28, 175, 75, 0.1);
            color: var(--color-primary);
          "
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="kpi-content">
          <span class="kpi-label">{{ $t("admin.activeOperators") }}</span>
          <span class="kpi-value">24</span>
          <span class="kpi-trend positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3L13 8L8 13"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M3 8H13"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            {{ $t("admin.plusToday") }}
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div
          class="kpi-icon"
          style="background: rgba(56, 189, 248, 0.1); color: #38bdf8"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="kpi-content">
          <span class="kpi-label">{{ $t("admin.avgRating") }}</span>
          <span class="kpi-value">4.8</span>
          <span class="kpi-trend positive">/5.0</span>
        </div>
      </div>

      <div class="kpi-card">
        <div
          class="kpi-icon"
          style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 6h-2v2h-2V6h-2V4h2V2h2v2h2v2zm-10 3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V17h14v-2.5c0-2.33-4.67-3.5-7-3.5z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="kpi-content">
          <span class="kpi-label">{{ $t("admin.totalOperators") }}</span>
          <span class="kpi-value">128</span>
          <span class="kpi-trend">{{ $t("admin.plusThisMonth") }}</span>
        </div>
      </div>

      <div class="kpi-card">
        <div
          class="kpi-icon"
          style="background: rgba(244, 114, 182, 0.1); color: #f472b6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="kpi-content">
          <span class="kpi-label">{{ $t("admin.pendingReviews") }}</span>
          <span class="kpi-value">43</span>
          <span class="kpi-trend warning">{{ $t("admin.needsAttention") }}</span>
        </div>
      </div>
    </div>

    <!-- Top Operators & Rating Distribution -->
    <div class="dashboard-grid">
      <!-- Top Rated Operators -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ $t("admin.topRatedOperators") }}</h3>
          <button class="card-action">{{ $t("admin.viewAll") }}</button>
        </div>

        <div class="operator-list">
          <div
            v-for="operator in topOperators"
            :key="operator.id"
            class="operator-item"
          >
            <div class="operator-info">
              <img
                :src="operator.avatar"
                :alt="operator.name"
                class="operator-avatar"
              />
              <div>
                <div class="operator-name">{{ operator.name }}</div>
                <div class="operator-meta">
                  {{ operator.team }} · {{ operator.shift }}
                </div>
              </div>
            </div>
            <div class="operator-rating">
              <div class="rating-stars">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="star"
                  :class="{ filled: n <= Math.floor(operator.rating) }"
                  >★</span
                >
              </div>
              <span class="rating-value">{{ operator.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Distribution -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ $t("admin.ratingDistribution") }}</h3>
          <span class="card-subtitle">{{ $t("admin.last30Days") }}</span>
        </div>

        <div class="distribution-bars">
          <div
            v-for="rating in distribution"
            :key="rating.stars"
            class="distribution-row"
          >
            <span class="distribution-label">{{ rating.stars }} ★</span>
            <div class="distribution-bar-container">
              <div
                class="distribution-bar"
                :style="{ width: rating.percentage + '%' }"
              ></div>
            </div>
            <span class="distribution-value">{{ rating.count }}</span>
          </div>
        </div>

        <div class="distribution-stats">
          <div class="stat">
            <span class="stat-label">{{ $t("admin.average") }}</span>
            <span class="stat-value">4.8</span>
          </div>
          <div class="stat">
            <span class="stat-label">{{ $t("admin.totalReviews") }}</span>
            <span class="stat-value">1,284</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quality Metrics -->
    <div class="quality-section">
      <h3 class="section-title">{{ $t("admin.qualityMetrics") }}</h3>
      <div class="quality-grid">
        <div class="quality-card">
          <div class="quality-header">
            <span class="quality-label">{{ $t("admin.callQuality") }}</span>
            <span class="quality-score">94%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 94%"></div>
          </div>
          <div class="quality-footer">
            <span class="quality-change positive">{{ $t("admin.vsLastWeek") }}</span>
          </div>
        </div>

        <div class="quality-card">
          <div class="quality-header">
            <span class="quality-label">{{ $t("admin.resolutionRate") }}</span>
            <span class="quality-score">88%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 88%"></div>
          </div>
          <div class="quality-footer">
            <span class="quality-change positive">{{ $t("admin.vsLastWeekSmall") }}</span>
          </div>
        </div>

        <div class="quality-card">
          <div class="quality-header">
            <span class="quality-label">{{ $t("admin.avgResponseTime") }}</span>
            <span class="quality-score">2.4m</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 76%"></div>
          </div>
          <div class="quality-footer">
            <span class="quality-change negative">{{ $t("admin.vsTarget") }}</span>
          </div>
        </div>

        <div class="quality-card">
          <div class="quality-header">
            <span class="quality-label">{{ $t("admin.customerSatisfaction") }}</span>
            <span class="quality-score">4.7</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 94%"></div>
          </div>
          <div class="quality-footer">
            <span class="quality-change positive">{{ $t("admin.aboveTarget") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      topOperators: [
        {
          id: 1,
          name: "Tika Lanchava",
          team: "Customer Support",
          shift: "Morning",
          rating: 4.9,
          avatar: "/images/female.png",
        },
        {
          id: 2,
          name: "Davit Khimshiashvili",
          team: "Technical Support",
          shift: "Evening",
          rating: 4.8,
          avatar: "/images/male.png",
        },
        {
          id: 3,
          name: "Mariam Saakadze",
          team: "Sales",
          shift: "Morning",
          rating: 4.8,
          avatar: "/images/female.png",
        },
        {
          id: 4,
          name: "Giorgi Mikeladze",
          team: "Customer Support",
          shift: "Night",
          rating: 4.7,
          avatar: "/images/male.png",
        },
      ],
      distribution: [
        { stars: 5, count: 845, percentage: 65 },
        { stars: 4, count: 312, percentage: 24 },
        { stars: 3, count: 89, percentage: 7 },
        { stars: 2, count: 28, percentage: 2 },
        { stars: 1, count: 10, percentage: 2 },
      ],
    };
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
}

/* Header */
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
}

.date-range {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30px;
}

.date-range-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.date-range-btn:hover {
  color: var(--color-text-primary);
}

.date-range-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.kpi-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-content {
  flex: 1;
}

.kpi-label {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.kpi-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.kpi-trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.kpi-trend.positive {
  color: var(--color-primary);
}

.kpi-trend.warning {
  color: #facc15;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Cards */
.card {
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.card-title {
  font-size: 1.1rem;
  margin: 0;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.card-action {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.card-action:hover {
  background: rgba(28, 175, 75, 0.1);
}

.card-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

/* Operator List */
.operator-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.operator-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.operator-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.operator-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.operator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
}

.operator-name {
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.operator-meta {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.operator-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: rgba(255, 255, 255, 0.2);
}

.star.filled {
  color: #fbbf24;
}

.star.small {
  font-size: 0.9rem;
}

.rating-value {
  font-weight: 600;
  min-width: 2rem;
}

/* Distribution Bars */
.distribution-bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.distribution-row {
  display: grid;
  grid-template-columns: 60px 1fr 40px;
  align-items: center;
  gap: 0.75rem;
}

.distribution-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.distribution-bar-container {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.distribution-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #4ade80);
  border-radius: 20px;
}

.distribution-value {
  font-size: 0.9rem;
  text-align: right;
}

.distribution-stats {
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

/* Team List */
.team-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.team-item {
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
}

.team-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.team-name {
  font-weight: 600;
}

.team-members {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.team-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.team-rating,
.team-chats,
.team-satisfaction {
  text-align: center;
}

.rating-badge {
  display: inline-block;
  background: rgba(28, 175, 75, 0.1);
  color: var(--color-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.chats-value,
.satisfaction-value {
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

/* Activity Feed */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.activity-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
}

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.activity-operator {
  font-weight: 500;
}

.activity-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.activity-comment {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

/* Quality Section */
.quality-section {
  margin-top: 1rem;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}

.quality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.quality-card {
  background: rgba(6, 39, 51, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.25rem;
}

.quality-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.quality-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.quality-score {
  font-size: 1.25rem;
  font-weight: 700;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #4ade80);
  border-radius: 20px;
}

.quality-footer {
  font-size: 0.8rem;
}

.quality-change {
  color: var(--color-text-secondary);
}

.quality-change.positive {
  color: var(--color-primary);
}

.quality-change.negative {
  color: #ef4444;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-range {
    width: 100%;
  }

  .date-range-btn {
    flex: 1;
    text-align: center;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .quality-grid {
    grid-template-columns: 1fr;
  }

  .team-metrics {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .distribution-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
