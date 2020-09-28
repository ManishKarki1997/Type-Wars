<template>
  <div class="center examplex">
    <vs-navbar not-line shadow target-scroll="#hide-scroll-content" rightCollapsed v-model="active">
      <template #left>
        <router-link to="/app/dashboard">
          <h2>Type<span>Wars</span></h2>
        </router-link>
      </template>

      <template #right>
        <vs-navbar-item
          to="/app/dashboard"
          :active="active == 'dashboard'"
          id="dashboard"
          v-if="isLoggedIn"
        >
          Dashboard
        </vs-navbar-item>
        <vs-navbar-item to="/app/feed" :active="active == 'feed'" id="feed" v-if="isLoggedIn">
          Feed
        </vs-navbar-item>
        <vs-navbar-item
          to="/app/leaderboards"
          :active="active == 'leaderboards'"
          id="leaderboards"
          v-if="isLoggedIn"
        >
          Leaderboards
        </vs-navbar-item>
        <vs-button flat v-if="!isLoggedIn">
          <router-link to="/login"> Log In </router-link>
        </vs-button>
        <vs-button v-if="!isLoggedIn">
          <router-link to="/signup"> Sign Up </router-link>
        </vs-button>
        <vs-button @click="logout" v-if="isLoggedIn" circle transparent> Logout </vs-button>

        <vs-avatar v-if="isLoggedIn" circle size="35">
          <img :src="user.avatar" alt="User Avatar" />
        </vs-avatar>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: "dashboard",
    };
  },
  computed: {
    ...mapState("user", ["isLoggedIn", "user"]),
  },
  methods: {
    logout() {
      this.active = "";
      this.$store.commit("user/LOGOUT");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.vs-navbar {
  padding: 8px 4rem !important;

  .vs-avatar-content {
    margin-left: 1rem;
    .vs-avatar {
      img {
        height: 100% !important;
      }
    }
  }
}
</style>
