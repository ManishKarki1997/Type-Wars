<template>
  <vs-card class="online-players-cards-wrapper">
    <template #title>
      <h3>Online Players</h3>
    </template>

    <template #text>
      <transition-group class="online-users" name="list" tag="ul">
        <li class="online-user" v-for="user in onlineUsers" :key="user.email">
          <vs-avatar circle size="35" badge badge-color="success">
            <img :src="user.avatar" :alt="user.name + ' avatar image'" />
          </vs-avatar>
          <div class="user-details">
            <h4>{{ user.name }}</h4>
            <!-- <p>{{ user.email }}</p> -->
          </div>

          <div class="user-actions-wrapper">
            <vs-tooltip circle top class="icon-wrapper">
              <GamepadIcon />
              <template #tooltip> Challenge for a game </template>
            </vs-tooltip>
            <vs-tooltip circle top class="icon-wrapper">
              <SupportIcon />
              <template #tooltip> Send a friend request </template>
            </vs-tooltip>
          </div>
        </li>
      </transition-group>
    </template>
  </vs-card>
</template>

<script>
import { mapState } from "vuex";
import GamepadIcon from "@/assets/icons/gamepad.svg";
import SupportIcon from "@/assets/icons/support.svg";

export default {
  components: {
    GamepadIcon,
    SupportIcon,
  },
  computed: {
    ...mapState("user", ["user", "onlineUsers"]),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.vs-card {
  height: 75vh !important;
  overflow-y: auto;
}
.online-players-cards-wrapper {
  .vs-card__title {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: white;
  }
  .online-users {
    margin-top: 1rem;
    .online-user {
      display: flex;
      align-items: center;
      padding: 0;
      padding: 8px;
      border-radius: 5px;
      margin-bottom: 8px;
      overflow: hidden;

      &:hover {
        background-color: #f8ececbd;

        h4 {
          color: #ff7f8a;
        }

        svg {
          fill: #ff7f8a;
        }

        .user-actions-wrapper {
          visibility: visible;
          transform: translateX(0);
        }
      }

      .vs-avatar-content {
        margin-right: 8px;
      }

      .user-details {
        max-width: 60%;
        margin-right: auto;
      }

      .user-actions-wrapper {
        display: flex;
        visibility: hidden;
        align-items: center;
        transform: translateX(4.5rem);
        transition: all 0.3s ease-in-out;
        .icon-wrapper {
          display: flex;
          align-items: center;
          margin-left: 12px;
          svg {
            width: 24px;
            height: 24px;
            transition: all 0.1s ease-in-out;

            &:hover {
              fill: #2c3e50;
            }
          }
        }
      }
    }
  }
}
</style>
