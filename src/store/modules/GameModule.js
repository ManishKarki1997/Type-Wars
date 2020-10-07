// import axios from "axios";

const UserModule = {
  namespaced: true,
  state: () => ({
    cleanTextToType: "",
    newChallengeData: null,
    activeGameDetails: null,
    gameCountdown: 0,
    matchResultsModal: {
      show: false,
      opponentLeft: false,
    },
    matchResults: {
      userDetails: null,
      opponentDetails: null,
      winner: "",
    }
  }),
  mutations: {
    SET_TEXT_TO_TYPE(state, payload) {
      state.cleanTextToType = payload
    },
    ADD_NEW_CHALLENGE_REQUEST(state, challengeRequest) {
      state.newChallengeData = challengeRequest;
    },
    SET_ACTIVE_GAME_DETAILS(state, payload) {
      state.activeGameDetails = payload;
    },
    SET_GAME_COUNTDOWN(state, gameCountdown) {
      state.gameCountdown = gameCountdown;
    },
    SET_MATCH_RESULTS_MODAL(state, matchResultsModal) {
      state.matchResultsModal = {
        ...state.matchResultsModal,
        ...matchResultsModal
      }
    },
    SET_MATCH_RESULTS(state, matchResults) {
      state.matchResults = {
        ...state.matchResults,
        ...matchResults
      }
    }
  },
  actions: {},
  getters: {},
};

export default UserModule;
