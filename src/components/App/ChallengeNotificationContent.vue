<template>
  <div class="challenge-notification-content">
    <p>
      <strong>{{ newChallengeData.challenger.name }}</strong> challenged you to a game.
    </p>
    <div class="challenger-details">
      <vs-avatar circle size="35">
        <img :src="newChallengeData.challenger.avatar" alt="User Avatar" />
      </vs-avatar>
      <div>
        <h4>{{ newChallengeData.challenger.name }}</h4>
      </div>
    </div>
    <p class="challenger-message">&ldquo;{{ newChallengeData.message }}&rdquo;</p>

    <div class="user-action-buttons-wrapper">
      <vs-button> Accept </vs-button>
      <vs-button transparent> Reject </vs-button>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  computed: {
    newChallengeData() {
      return store.state.game.newChallengeData;
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.challenge-notification-content {
  padding: 1rem;
  min-width: 400px;

  .challenger-details {
    margin-top: 1rem;
    display: flex;

    .vs-avatar-content {
      margin-right: 8px;
    }
  }

  .challenger-message {
    margin-top: 8px;
  }

  .user-action-buttons-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
