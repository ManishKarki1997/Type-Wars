import axios from "axios";

const UserModule = {
  namespaced: true,
  state: () => ({
    newChallengeData: null,
    activeGameDetails: null,
    gameCountdown: 0,
  }),
  mutations: {
    ADD_NEW_CHALLENGE_REQUEST(state, challengeRequest) {
      state.newChallengeData = challengeRequest;
    },
    SET_ACTIVE_GAME_DETAILS(state, payload) {
      state.activeGameDetails = payload;
    },
    SET_GAME_COUNTDOWN(state, gameCountdown) {
      state.gameCountdown = gameCountdown;
    },
  },
  actions: {},
  getters: {},
};

export default UserModule;
