<template>
  <div class="game-page-wrapper">
    <div v-if="!gameHasStarted" class="countdown-timer-wrapper">
      <p>Game Starting In</p>
      <h2>{{ countdownTimer }}</h2>
    </div>

    <div v-else>
      <pre>{{ activeGameDetails }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      roomId: "",
      countdownTimer: 0,
      gameHasStarted: false,
    };
  },
  computed: {
    ...mapState("game", ["activeGameDetails"]),
  },
  sockets: {
    GAME_START_COUNTDOWN({ countdownTimer }) {
      this.countdownTimer = countdownTimer;
      this.startCountdownTimer();
    },
  },
  methods: {
    startCountdownTimer() {
      if (this.countdownTimer > 0) {
        setTimeout(() => {
          this.countdownTimer -= 1;
          this.startCountdownTimer();
        }, 1000);
      } else {
        this.gameHasStarted = true;
      }
    },
  },

  mounted() {
    this.roomId = this.$route.query.roomId;
    this.$socket.emit("JOIN_ROOM", this.roomId);
    this.$socket.emit("PLAYER_READY", this.roomId);
  },
};
</script>

<style lang="scss" scoped>
.game-page-wrapper {
  height: calc(100vh - 6rem);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .countdown-timer-wrapper {
    text-align: center;
    h2 {
      font-size: 7rem;
    }
    p {
      margin-bottom: -1rem;
      font-size: 1.5rem;
    }
  }
}
</style>
