import axios from "axios";

const UserModule = {
  namespaced: true,
  state: () => ({
    challengeRequests: [],
    newChallengeData: null,
  }),
  mutations: {
    ADD_NEW_CHALLENGE_REQUEST(state, challengeRequest) {
      state.newChallengeData = challengeRequest;
      state.challengeRequests.push(challengeRequest);
    },
  },
  actions: {},
  getters: {},
};

export default UserModule;
