import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/app/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "signup" */ "../views/App/Dashboard.vue"),
  },
  {
    path: "/app/feed",
    name: "Feed",
    component: () => import(/* webpackChunkName: "signup" */ "../views/App/Feed.vue"),
  },
  {
    path: "/app/leaderboards",
    name: "Leaderboards",
    component: () => import(/* webpackChunkName: "signup" */ "../views/App/Leaderboards.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
