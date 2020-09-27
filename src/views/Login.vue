<template>
  <div>
    <Navbar />
    <section>
      <div class="login-form-wrapper">
          <div class="mb-4 form-header-wrapper">
          <h4>Login to your account</h4>
        </div>
        <form @submit.prevent="handleUserLogin">
          <b-field label="Username">
            <b-input v-model="user.username" maxlength="30" required></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              value="123"
              v-model="user.password"
              type="password"
              maxlength="30"
              required
            ></b-input>
          </b-field>

          <div>
            <b-button native-type="submit" class="is-primary">Login</b-button>

            <div class="mt-4" style="display:flex;">
                <h4 class="mr-2">Don't have an account?</h4>
                <router-link to="/signup"><strong>Signup</strong></router-link>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Cookies from 'js-cookie'

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async handleUserLogin() {
    const res = await this.$axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`,this.user);
      if(!res.data.error){
        this.$toast.open({
            type:"success",
            message:res.data.message,
        })
        Cookies.set("token", res.data.payload.token);
        this.$store.commit("user/SET_USER",{
            isLoggedIn: true,
            user:res.data.payload.user,
            token: res.data.payload.token
        });

        setTimeout(() => {
            this.$router.push('/app/dashboard');
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
      width: 100%;
    }
  }
}
</style>