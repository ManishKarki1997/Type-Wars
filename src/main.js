import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "material-icons/iconfont/material-icons.css";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import VueSocketIO from "vue-socket.io";
require("@/assets/css/main.scss");
import "@/assets/css/tailwind.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  timeout: 3000,
  hideProgressBar: true,
  closeOnClick: false
});

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.prototype.$axios = axios;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.getJSON("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Vue.use(VueToast, {
//   position: "top-right",
//   duration: 2000,
//   type: "info",
// });

Vue.use(Vuesax, {});

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: "https://typewars.herokuapp.com",
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
