<template>
  <div class="center examplex">
    <vs-navbar not-line shadow target-scroll="#hide-scroll-content" rightCollapsed v-model="active">
      <template #left>
        <router-link :to="isLoggedIn ? '/app/dashboard' : '/'">
          <h2>Type<span>Wars</span></h2>
        </router-link>
      </template>

      <template #right>
        <!-- <vs-navbar-item
          to="/app/dashboard"
          :active="active == 'dashboard'"
          id="dashboard"
          v-if="isLoggedIn"
        >
          Dashboard
        </vs-navbar-item>
        <vs-navbar-item
          to="/app/feed"
          :active="active == 'feed'"
          id="feed"
          v-if="isLoggedIn"
        >
          Feed
        </vs-navbar-item>
        <vs-navbar-item
          to="/app/leaderboards"
          :active="active == 'leaderboards'"
          id="leaderboards"
          v-if="isLoggedIn"
        >
          Leaderboards
        </vs-navbar-item> -->
        <vs-button flat v-if="!isLoggedIn">
          <router-link to="/login"> Log In </router-link>
        </vs-button>
        <vs-button v-if="!isLoggedIn">
          <router-link to="/signup"> Sign Up </router-link>
        </vs-button>
        <vs-button @click="handleLogoutButtonClick" v-if="isLoggedIn" circle transparent>
          Logout
        </vs-button>

        <vs-avatar @click="$router.push('/app/dashboard')" v-if="isLoggedIn" circle size="35">
          <img :src="user.avatar" alt="User Avatar" />
        </vs-avatar>
      </template>
    </vs-navbar>

    <vs-dialog class="navbar-dialog" width="550px" blur not-center v-model="showConfirmLogoutModal">
      <template #header>
        <h4 class="not-margin">Are you sure you want to logout?</h4>
      </template>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="logout" active> Yes </vs-button>
          <vs-button @click="showConfirmLogoutModal = false" dark transparent> Cancel </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: "dashboard",
      showConfirmLogoutModal: false,
    };
  },
  computed: {
    ...mapState("user", ["isLoggedIn", "user"]),
  },
  methods: {
    handleLogoutButtonClick() {
      this.showConfirmLogoutModal = true;
    },
    logout() {
      this.active = "";
      this.$store.commit("user/LOGOUT");
      this.showConfirmLogoutModal = false;
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.vs-navbar-content {
  z-index: 800 !important;
}
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
.navbar-dialog {
  .vs-dialog__content {
    display: none;
  }
}
.con-footer {
  display: flex;
  align-items: center;
}
</style>
