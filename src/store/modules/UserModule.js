import axios from "axios";
import Cookies from "js-cookie";

const UserModule = {
  namespaced: true,
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null,
    socketId: "",
    onlineUsers: [],
  }),
  mutations: {
    SET_USER(state, { isLoggedIn, user, token }) {
      state.isLoggedIn = isLoggedIn;
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
    SET_USER_SOCKET_ID(state, socketId) {
      state.socketId = socketId;
    },
    SET_ONLINE_USERS(state, users) {
      state.onlineUsers = users;
    },
  },
  actions: {},
  getters: {},
};

export default UserModule;
