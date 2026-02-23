import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import AdminLayout from "@/views/AdminLayout.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import { isAdmin, isAuthenticated } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => (isAuthenticated() ? (isAdmin() ? "/admin/dashboard" : "/dashboard") : "/login")
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
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "",
          redirect: { name: "admin-dashboard" }
        },
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: AdminDashboard
        },
        {
          path: "users",
          name: "admin-users",
          component: AdminUsers
        }
      ]
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
