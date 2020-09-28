import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Feed from "../views/App/Feed.vue";

import Cookies from "js-cookie";

Vue.use(VueRouter);

const AuthGuard = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
  },
  {
    name: "App",
    path: "/app",
    beforeEnter: AuthGuard,
    redirect: "/app/dashboard",
    component: () => import(/* webpackChunkName: "Dashboard" */ "../views/App/Home"),
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import(/* webpackChunkName: "Dashboard" */ "../views/App/Dashboard.vue"),
      },
      {
        name: "Feed",
        path: "feed",
        component: Feed,
        // component: view("App/Feed.vue"),
        component: () => import(/* webpackChunkName: "Feed" */ "../views/App/Feed"),
      },
      {
        name: "Leaderboards",
        path: "leaderboards",
        // component: view("App/Leaderboards.vue"),
        component: () => import(/* webpackChunkName: "Leaderboards" */ "../views/App/Leaderboards"),
      },
    ],
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "Error" */ "../views/Error"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
