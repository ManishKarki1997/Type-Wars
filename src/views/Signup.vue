<template>
  <div>
    <Navbar />
    <section>
      <div class="signup-form-wrapper">
        <div class="mb-4 form-header-wrapper">
          <h4>Signup for an account</h4>
        </div>
        <form @submit.prevent="handleUsersignup">
          <b-field label="Name">
            <b-input v-model="user.name" required></b-input>
          </b-field>
          <b-field label="Username">
            <b-input v-model="user.username" min-length="6" required></b-input>
          </b-field>
          <b-field label="Email">
            <b-input v-model="user.email" min-length="6" required></b-input>
          </b-field>

          <div class="columns">
            <b-field class="column one-half" label="Password">
              <b-input
                value="123"
                v-model="user.password"
                type="password"
                maxlength="30"
                required
              ></b-input>
            </b-field>
            <b-field class="column one-half" label="Retype Password">
              <b-input
                value="123"
                v-model="user.password"
                type="password"
                maxlength="30"
                required
              ></b-input>
            </b-field>
          </div>

          <div>
            <b-button native-type="submit" class="is-primary">Signup</b-button>
            <div class="mt-2" style="display: flex">
              <h4 class="mr-2">Already have an account?</h4>
              <router-link to="/login"><strong>Login</strong></router-link>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        username: '',
        password: '',
        retypePassword: '',
      },
    };
  },
  methods: {
    async handleUsersignup() {
      const res = await this.$axios.post(`${process.env.VUE_APP_API_URL}/api/auth`,this.user);
      if(!res.data.error){
        this.$toast.open({
            message:res.data.message
        })
        setTimeout(() => {
            this.$router.push('/login');
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  height: calc(100vh - 4rem);
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
      width: 100%;
      .field .label {
        font-weight: 300;
      }
    }
  }
}
</style>