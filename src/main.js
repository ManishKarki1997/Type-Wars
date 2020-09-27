import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import Cookies from 'js-cookie';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
require('@/assets/css/main.scss');

// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';


axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.prototype.$axios = axios;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.getJSON('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

Vue.use(Buefy);
Vue.use(VueToast,{
  position:"top-right",
  duration:2000,
  type:"info"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');