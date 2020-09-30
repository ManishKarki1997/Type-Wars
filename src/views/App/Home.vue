<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["isLoggedIn", "user"]),
  },
  mounted() {
    if (this.isLoggedIn && this.user) {
      this.$socket.emit("USER_JOIN", {
        ...this.user,
      });
    }
  },
  sockets: {
    MY_SOCKET_ID(socketId) {
      this.$store.commit("user/SET_USER_SOCKET_ID", socketId);
    },
  },
};
</script>
