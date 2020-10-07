import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import UserModule from "./modules/UserModule";
import GameModule from "./modules/GameModule";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "TYPEWARS_VUEX",
  storage: window.localStorage,
  modules: ["user"],
});

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {},
  modules: {
    user: UserModule,
    game: GameModule,
  },
  plugins: [vuexLocal.plugin],
});
