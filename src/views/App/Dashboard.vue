<template>
  <div class="px-12">
    <OnlinePlayers />
  </div>
</template>

<script>
import { mapState } from "vuex";

import OnlinePlayers from "@/components/App/OnlinePlayers";

export default {
  components: {
    OnlinePlayers,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["isLoggedIn", "user", "onlineUsers"]),
  },
  sockets: {
    ONLINE_USERS(newOnlineUsers) {
      const transformedOnlineUsers = Object.keys(newOnlineUsers).map(
        (userKey) => newOnlineUsers[userKey]
      );
      this.$store.commit("user/SET_ONLINE_USERS", transformedOnlineUsers);
    },
  },

  async mounted() {
    this.$store.commit("game/SET_MATCH_RESULTS_MODAL", {
      show: false,
      opponentLeft: false,
    });
  },
};
</script>
