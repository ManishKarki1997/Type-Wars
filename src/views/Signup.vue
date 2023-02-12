<template>
  <section>
    <div class="signup-form-wrapper">
      <div class="flex items-center justify-between mb-1 form-header-wrapper">
        <h4>Signup for an account</h4>
        <vs-tooltip circle top class="ml-2 icon-wrapper">
          <InfoIcon />
          <template #tooltip> You can use dummy data </template>
        </vs-tooltip>
      </div>
      <form @submit.prevent="handleUsersignup">
        <vs-input type="text" label="Name" v-model="user.name"> </vs-input>

        <vs-input type="text" label="Username" v-model="user.username">
        </vs-input>

        <vs-input type="email" label="Email" v-model="user.email"> </vs-input>

        <vs-row class="columns password-row">
          <vs-input
            type="password"
            label="Password"
            v-model="user.password"
            style="width: 100%; margin-bottom: 0"
          >
          </vs-input>
          <vs-input
            type="password"
            label="Retype Password"
            v-model="user.retypePassword"
            style="width: 100%"
          ></vs-input>
        </vs-row>

        <div>
          <vs-button
            :loading="isCallingAPI"
            size="large"
            circle
            :active="activeButton == 0"
            button="submit"
          >
            Signup
          </vs-button>

          <div class="form-footer-wrapper">
            <h4 class="mr-2">Already have an account?</h4>
            <vs-button to="/login" transparent circle> Login </vs-button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import InfoIcon from "@/assets/icons/info.svg";

export default {
  components: {
    InfoIcon,
  },
  data() {
    return {
      activeButton: 0,
      isCallingAPI: false,
      user: {
        name: "",
        email: "",
        username: "",
        password: "",
        retypePassword: "",
      },
    };
  },
  methods: {
    async handleUsersignup() {
      this.isCallingAPI = true;
      try {
        const res = await this.$axios.post(
          `${
            process.env.VUE_APP_API_URL ||
            "https://typewarsapi-production.up.railway.app"
          }/api/auth`,
          this.user
        );

        if (!res.data.error) {
          this.$toast.success(res.data.message);

          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        }
      } catch (error) {
        if (!error?.response) {
          this.$toast.error("Something went wrong");
          return;
        }
        this.$toast.error(error?.response?.data.message);
      } finally {
        this.isCallingAPI = false;
      }
    },
  },
};
</script>

<style lang="scss">
section {
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;

  .signup-form-wrapper {
    width: 35%;
    margin: 0 auto;

    .form-header-wrapper {
      text-align: center;
      h4 {
        font-weight: bold;
        font-size: 24px;
        font-weight: bold;
      }
    }

    form {
      background-color: white;
      padding: 2rem;
      border-radius: 5px;

      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      &:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }

      .vs-input-parent {
        margin: 2rem 0;
        // margin: 1.5rem 0 3rem 0;

        label {
          font-size: 16px;
        }

        .vs-input-content {
          .vs-input {
            // padding: 10px;
            width: 100%;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid rgb(163, 161, 161);
            margin-bottom: 8px;
            margin-left: 1rem !important;
          }
        }
      }
      .password-row {
        margin-top: -2rem !important;
      }
      .form-footer-wrapper {
        display: flex;
        align-items: center;
        margin-top: 2rem;

        .vs-button {
          margin-left: 8px;
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
