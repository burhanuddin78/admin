import VueRouter from "vue-router";
import { isLoggedIn } from "../utils/auth";
import Home from "../views/Home";
import Login from "../components/Auth/Login";
import ForgetPassGenerateOTP from "../components/Auth/ForgetPassword/ForgetPassGenerateOTP";
import ChangePassword from "../components/Auth/ForgetPassword/ChangePassword";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminDashboardStats from "../components/Dashboard/AdminDashboardStats";
import ProductsCreate from "../components/Products/ProductsCreate";
import CategoriesCreate from "../components/Categories/CategoriesCreate";
import SpecificationsCreate from "../components/Specifications/SpecificationsCreate";

const routes = [
  {
    path: "",
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/forget-password",
    name: "forget-password",
    component: ForgetPassGenerateOTP,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/password-change",
    name: "password-change",
    component: ChangePassword,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/admin",
    component: AdminDashboard,
    children: [
      {
        path: "",
        name: "admin.dashboard",
        component: AdminDashboardStats,
      },
      {
        path: "dashboard",
        name: "admin.dashboard.stats",
        component: AdminDashboardStats,
        // vue smart route
        smart: {
          matcher: {
            search: [/dashboard/],
            title: () => "Dashboard",
          },
        },
      },
      {
        path: "products/create",
        name: "admin.products.create",
        component: ProductsCreate,
        smart: {
          matcher: {
            search: [/product create/, /products create/],
            title: () => "Create Product",
          },
        },
      },
      {
        path: "categories/create",
        name: "admin.categories.create",
        component: CategoriesCreate,
        smart: {
          matcher: {
            search: [/category create/, /categories create/],
            title: () => "Create Category",
          },
        },
      },
      {
        path: "specifications/create",
        name: "admin.specifications.create",
        component: SpecificationsCreate,
        smart: {
          matcher: {
            search: [/specification create/, /specifications create/],
            title: () => "Create Specification",
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  isLoggedIn().then((data) => {
    if (to.name == "login" && data) {
      next({ path: "/admin" });
    } else if (!to.meta.allowAnonymous && !data) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  });
});

export default router;
