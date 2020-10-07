<template>
  <div class="game-page-wrapper lg:px-16 md:px-4 bg-gray-200 overflow-hidden">
    <div
      class="flex justify-between py-8"
      v-if="!showIntroScreen && gameHasStarted"
    >
      <div class="w-9/12">
        <MatchArea />
      </div>
      <div class="w-3/12 ml-4">
        <MatchStats />
      </div>

      <MatchResults />
    </div>

    <transition leave-active-class="fade-out" v-if="showIntroScreen">
      <div class="intro-screen-wrapper">
        <div class="splash-wrapper">
          <div class="player-splash player-splash--left">
            <img
              src="https://w.wallhaven.cc/full/2e/wallhaven-2ero7g.jpg"
              alt=""
            />

            <div class="player-details-wrapper">
              <img :src="user.avatar" alt="" />
              <div class="player-info">
                <h4>{{ user.name }}</h4>
                <p>{{ user.username }}</p>
              </div>
            </div>
          </div>

          <div class="player-splash player-splash--right">
            <img
              src="https://w.wallhaven.cc/full/g8/wallhaven-g8o86d.jpg"
              alt=""
            />

            <div class="player-details-wrapper">
              <img :src="opponentDetails.avatar" alt="" />
              <div class="player-info">
                <h4>{{ opponentDetails.name }}</h4>
                <p>{{ opponentDetails.username }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="countdown-timer-wrapper">
          <h2>{{ countdownTimer }}</h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { gsap, Linear, TweenLite } from "gsap";

import MatchStats from "@/components/App/Match/MatchStats";
import MatchArea from "@/components/App/Match/MatchArea";
import MatchResults from "@/components/App/Match/MatchResults";

export default {
  components: {
    MatchStats,
    MatchArea,
    MatchResults,
  },
  data() {
    return {
      roomId: "",
      countdownTimer: 0,
      gameCountdown: 0,
      gameHasStarted: false,
      showIntroScreen: true,
    };
  },
  computed: {
    ...mapState("game", ["activeGameDetails"]),
    ...mapState("user", ["user", "userGameDetails", "socketId"]),
    opponentDetails() {
      return this.activeGameDetails[
        Object.keys(this.activeGameDetails).find(
          (key) => this.activeGameDetails[key].email !== this.user.email
        )
      ];
    },
  },
  sockets: {
    GAME_START_COUNTDOWN({ countdownTimer, textToType }) {
      this.$store.commit("game/SET_TEXT_TO_TYPE", textToType);
      const duration = countdownTimer;

      this.countdownTimer = countdownTimer;
      this.startCountdownTimer();

      gsap.to(".player-splash--right", {
        duration: 5,
        y: -75,
        opacity: 0.9,
        ease: Linear.ease,
      });

      gsap.to(".player-splash--left", {
        duration: 5,
        y: 75,
        opacity: 0.9,
        ease: Linear.ease,
      });

      gsap.to(".player-splash--right .player-details-wrapper", {
        duration: 4,
        y: 75,
        opacity: 0.9,
        ease: Linear.ease,
      });
      gsap.to(".player-splash--left .player-details-wrapper", {
        duration: 4,
        y: -75,
        opacity: 0.9,
        ease: Linear.ease,
      });
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
        this.showIntroScreen = false;
        setTimeout(() => {
          this.gameHasStarted = true;
        }, 1000);
      }
    },
  },

  mounted() {
    this.roomId = this.$route.query.roomId;
    this.$socket.emit("JOIN_ROOM", this.roomId);
    this.$socket.emit("PLAYER_READY", this.roomId);
    console.log(this.activeGameDetails);
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
.fade-out {
  opacity: 0;
  transition-duration: 0.5s;
}
.intro-screen-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .splash-wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;

    .player-splash {
      position: relative;
      height: 100%;
      width: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .player-details-wrapper {
        position: absolute;
        top: 6rem;
        left: 1rem;
        padding: 1rem;
        min-width: 250px;
        border-radius: 5px;
        background-color: white;
        border-radius: 5px;
        display: flex;

        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }

        .player-info {
          margin-left: 8px;

          h4 {
            margin-bottom: -8px;
          }
        }
      }
    }

    .player-splash--left {
      border-radius: 5px 0 0 5px;
      margin-bottom: 150px;

      .player-details-wrapper {
        top: 80%;
        transform: translate(70%, 0%);
      }
    }

    .player-splash--right {
      border-radius: 0 5px 5px 0;
      margin-top: 150px;

      .player-details-wrapper {
        top: 10%;
        transform: translate(70%, -20%);
      }
    }
  }
  .countdown-timer-wrapper {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 25%;
    left: 40%;
    transform: translateX(-50%, -50%);
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 7rem;
    }
    p {
      margin-bottom: -2rem;
      font-size: 1.5rem;
    }
  }
}
</style>
