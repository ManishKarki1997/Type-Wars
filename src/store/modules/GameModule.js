import axios from "axios";

const UserModule = {
  namespaced: true,
  state: () => ({
    newChallengeData: null,
    activeGameDetails: null,
  }),
  mutations: {
    ADD_NEW_CHALLENGE_REQUEST(state, challengeRequest) {
      state.newChallengeData = challengeRequest;
    },
    setActiveGameDetails(state, payload) {
      state.activeGameDetails = payload;
    },
  },
  actions: {},
  getters: {},
};

export default UserModule;
