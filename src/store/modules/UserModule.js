import axios from 'axios';

const UserModule = {
  namespaced: true,
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null,
  }),
  mutations: {
    SET_USER(state, { isLoggedIn, user, token }) {
      state.isLoggedIn = isLoggedIn;
      state.user = user;
      state.token = token;
    },
  },
  actions: {
  },
  getters: { }
};

export default UserModule;