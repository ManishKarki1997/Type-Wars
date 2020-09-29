<template>
  <div>
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
 
};
</script>
