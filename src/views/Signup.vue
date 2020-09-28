<template>
  <div>
    <Navbar />
    <section>
      <div class="signup-form-wrapper">
        <div class="mb-4 form-header-wrapper">
          <h4>Signup for an account</h4>
        </div>
        <form @submit.prevent="handleUsersignup">
          <vs-input type="text" label="Name" v-model="user.name" required> </vs-input>

          <vs-input type="text" label="Username" v-model="user.username" required> </vs-input>

          <vs-input type="email" label="Email" v-model="user.email" required> </vs-input>

          <div class="columns">
            <vs-input type="password" label="Password" v-model="user.password" required> </vs-input>
            <vs-input type="password" label="Password" v-model="user.retypePassword" required>
            </vs-input>
          </div>

          <div>
            <vs-button
              :loading="isCallingAPI"
              size="large"
              circle
              :active="activeButton == 0"
              type="submit"
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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
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
        const res = await this.$axios.post(`${process.env.VUE_APP_API_URL}/api/auth`, this.user);
        if (!res.data.error) {
          this.$vs.notification({
            title: res.data.message,
            text: "Redirecting...",
            duration: 2000,
            color: "primary",
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        }
      } catch (error) {
        this.$vs.notification({
          title: "Error",
          text: "Something went wrong.",
          color: "danger",
          duration: 2000,
          square: true,
        });
      } finally {
        this.isCallingAPI = false;
      }
    },
  },
};
</script>

<style lang="scss">
section {
  background-color: #edf2f7;
  // height: calc(100vh - 4rem);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .signup-form-wrapper {
    width: 30%;
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
      box-shadow: 12px 0px 10px -10px rgba(0, 0, 0, var(--vs-shadow-opacity));
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
