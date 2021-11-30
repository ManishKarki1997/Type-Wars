<template>
  <div>
    <vs-dialog width="700px" not-center blur v-model="matchResultsModal.show">
      <template #header>
        <h4 class="text-2xl font-bold text-center not-margin">
          {{
            !matchResults.winner
              ? "DRAW"
              : matchResults.winner.email === user.email
              ? "You Won!"
              : "You Lost."
          }}
        </h4>
      </template>

      <div class="con-content" v-if="matchResults.userDetails && matchResults.opponentDetails">
        <div class="flex items-center justify-between px-4">
          <div class="flex w-5/12 py-2 rounded">
            <img
              class="object-cover w-16 h-16 rounded-full"
              :src="matchResults.userDetails.avatar"
              :alt="matchResults.userDetails.name + 'avatar'"
            />
            <div class="ml-2">
              <h4 class="text-xl font-bold">
                {{ matchResults.userDetails.name }}
              </h4>

              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.accuracy > matchResults.opponentDetails.accuracy
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{ matchResults.userDetails.accuracy }}%
              </h4>
              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.wpm > matchResults.opponentDetails.wpm
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{ matchResults.userDetails.wpm }}
              </h4>
              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.completion > matchResults.opponentDetails.completion
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{ matchResults.userDetails.completion }}%
              </h4>
            </div>
          </div>

          <div class="w-2/12 mt-8 text-center">
            <p>Accuracy</p>
            <p>WPM</p>
            <p>Completion</p>
          </div>

          <div class="flex justify-end w-5/12 py-2 text-right rounded">
            <div class="mr-2">
              <h4 class="text-xl font-bold">
                {{ matchResults.opponentDetails.name }}
              </h4>
              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.accuracy < matchResults.opponentDetails.accuracy
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{
                  matchResultsModal.opponentLeft
                    ? "Left"
                    : matchResults.opponentDetails.accuracy + "%"
                }}
              </h4>
              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.wpm < matchResults.opponentDetails.wpm
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{ matchResultsModal.opponentLeft ? "Left" : matchResults.opponentDetails.wpm }}
              </h4>
              <h4
                class="mr-2 font-bold"
                :class="
                  !matchResultsModal.opponentLeft &&
                  (matchResults.userDetails.completion > matchResults.opponentDetails.completion
                    ? 'text-green-500'
                    : 'text-red-500')
                "
              >
                {{
                  matchResultsModal.opponentLeft
                    ? "Left"
                    : matchResults.opponentDetails.completion + "%"
                }}
              </h4>
            </div>
            <img
              class="object-cover w-16 h-16 rounded-full"
              :src="matchResults.opponentDetails.avatar"
              :alt="matchResults.opponentDetails.name + 'avatar'"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="handleRematch" :active="active == 1"> Rematch </vs-button>
          <vs-button @click="closeShowMatchResultsModal" dark transparent> Ok </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["user", "userGameDetails"]),
    ...mapState("game", ["activeGameDetails", "matchResultsModal", "matchResults"]),
    opponentDetails() {
      return this.activeGameDetails[
        Object.keys(this.activeGameDetails).find(
          (key) => this.activeGameDetails[key].email !== this.user.email
        )
      ];
    },
  },
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    handleRematch() {
      this.$socket.emit("CHALLENGE_FOR_A_REMATCH", {
        challenger: this.matchResults.userDetails,
        challengedUser: this.matchResults.opponentDetails,
      });
      this.$router.go(-1);
    },
    closeShowMatchResultsModal() {
      this.$store.commit("game/SET_MATCH_RESULTS_MODAL", {
        show: false,
        opponentLeft: false,
      });
      this.$router.push("/app/dashboard");
    },
  },
  sockets: {
    OPPONENT_LEFT_THE_GAME(opponentDetails) {
      this.$vs.notification({
        color: "success",
        position: "top-right",
        duration: 5000,
        title: "You Won",
        text: "Opponent left the game",
      });
      this.$router.push("/app/dashboard");

      // this.$store.commit("game/SET_MATCH_RESULTS_MODAL", {
      //   show: true,
      //   opponentLeft: true,
      //   winner: this.user,
      //   opponentDetails,
      //   userDetails: this.user,
      // });
      // this.$store.commit("game/SET_MATCH_RESULTS", {
      //   userDetails: data.gameDetails[this.user.email],
      //   opponentDetails,
      //   winner: data.gameDetails[this.user.email],
      // });
    },
    MATCH_FINISHED(data) {
      const opponentEmail =
        this.activeGameDetails[
          Object.keys(this.activeGameDetails).find(
            (key) => this.activeGameDetails[key].email !== this.user.email
          )
        ].email;

      this.$store.commit("game/SET_MATCH_RESULTS", {
        userDetails: data.gameDetails[this.user.email],
        opponentDetails: data.gameDetails[opponentEmail],
        winner: data.winner,
      });

      this.$store.commit("game/SET_MATCH_RESULTS_MODAL", {
        show: true,
        opponentLeft: false,
      });
    },
  },
};
</script>
