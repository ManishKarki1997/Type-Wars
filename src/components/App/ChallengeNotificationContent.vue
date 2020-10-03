<template>
  <div class="flex">
    <div class="w-1/6 mr-4">
      <vs-avatar circle size="60">
        <img :src="challengeData.challenger.avatar" alt="User Avatar" />
      </vs-avatar>
    </div>
    <div class="w-5/6">
      <h5 v-if="!isARematch">
        <strong>{{ challengeData.challenger.name }}</strong> challenged you to a game.
      </h5>
      <h5 v-if="isARematch">
        <strong>{{ challengeData.challenger.name }}</strong> asked for a rematch.
      </h5>
      <!-- <p class="italic">{{ challengeData.message }}</p> -->
      <div class="mt-2 flex items-center">
        <button
          class="px-6 py-1 bg-gray-200 text-black rounded-sm mr-4"
          @click="challengeDecision('ACCEPT')"
        >
          Accept
        </button>
        <button @click="challengeDecision('REJECT')">Reject</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  props: {
    challengeData: {
      type: Object,
      required: true,
    },
    isARematch: {
      type: Boolean,
    },
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
      this.$toast.clear();
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
