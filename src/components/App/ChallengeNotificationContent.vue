<template>
  <div class="challenge-notification-content">
    <!-- <p>
    </p> -->
    <div class="challenger-details">
      <vs-avatar circle size="40">
        <img :src="challengeData.challenger.avatar" alt="User Avatar" />
      </vs-avatar>
      <div>
        <strong>{{ challengeData.challenger.name }}</strong> challenged you to a game.
    <p class="challenger-message">{{ challengeData.message }}</p>
    <div class="user-action-buttons-wrapper">
      <vs-button @click="challengeDecision('ACCEPT')"> Accept </vs-button>
      <vs-button @click="challengeDecision('REJECT')" transparent shadow> Reject </vs-button>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  props:{
    challengeData:{
      type:Object,
      required : true
    }
  },
  computed: {
    // challengeData() {
    //   return store.state.game.challengeData;
    // },
  },

  data() {
    return {};
  },
  methods: {
    challengeDecision(decision) {
      this.$socket.emit("CHALLENGE_DECISION", {
        ...this.challengeData,
        decision,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.challenge-notification-content {
  min-width: 400px;

  .challenger-details {
    margin-top: 1rem;
    display: flex;

    .vs-avatar-content {
      margin-right: 8px;
    }
  }

  .challenger-message {
    margin-top: -4px;
    margin-bottom: 8px;
    color: rgb(240, 236, 236);
  }

  .user-action-buttons-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
