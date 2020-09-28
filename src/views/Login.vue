<template>
  <section>
    <div class="login-form-wrapper">
      <div class="mb-4 form-header-wrapper">
        <h4>Login to your account</h4>
      </div>
      <form @submit.prevent="handleUserLogin">
        <vs-input type="text" label="Username" v-model="user.username"> </vs-input>

        <vs-input type="password" label="Password" v-model="user.password"> </vs-input>
        <div>
          <vs-button :loading="isCallingAPI" size="large" active button="submit"> Login </vs-button>

          <div class="form-footer-wrapper">
            <h4>Don't have an account?</h4>
            <vs-button to="/signup" size="large" transparent circle> Signup </vs-button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isCallingAPI: false,
      activeButton: 0,

      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleUserLogin() {
      this.isCallingAPI = true;

      try {
        const res = await this.$axios.post(
          `${process.env.VUE_APP_API_URL}/api/auth/login`,
          this.user
        );
        if (!res.data.error) {
          // this.$vs.notification({
          //   title: res.data.message,
          //   duration: 2000,
          //   color: "success",
          //   position:'top-right',
          // });

          this.$toast.success(res.data.message);
          Cookies.set("token", res.data.payload.token);
          this.$store.commit("user/SET_USER", {
            isLoggedIn: true,
            user: res.data.payload.user,
            token: res.data.payload.token,
          });

          setTimeout(() => {
            this.$router.push("/app/dashboard");
          }, 2000);
        }
      } catch (error) {
        this.$toast.error(error.response.data.message);
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

  .login-form-wrapper {
    width: 25%;
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
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      &:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      .vs-input-parent {
        margin: 2rem 0 !important;

        label {
          font-size: 16px;
        }

        .vs-input-content {
          .vs-input {
            margin-top: 4px;
            padding: 10px;
            min-width: 100%;
            font-size: 16px;
            border-radius: 5px;
          }
        }
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
