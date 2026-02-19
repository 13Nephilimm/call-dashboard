import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import { authState, isAdmin, isAuthenticated } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { public: true }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: UserDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to) => {
  if (to.meta.public) {
    return true;
  }

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: "login" };
  }

  if (to.meta.requiresAdmin && !isAdmin()) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;
