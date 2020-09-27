<template>
    <b-navbar shadow class="container">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    
                        <router-link to="/app/feed" class=" mr-4" v-if="isLoggedIn">
                            Feed
                        </router-link>
                    

                    
                        <router-link to="/app/leaderboards" class=" mr-4" v-if="isLoggedIn">
                            Leaderboards
                        </router-link>
                    

                    
                    <div class="user-avatar-wrapper">
                        <img :src="user.avatar" :alt="user.name + ' avatar'" />
                    </div>
                    <router-link to="/signup" class=" mr-4" v-if="!isLoggedIn">
                        <b-button rounded>Sign up</b-button>
                    </router-link>
                    <router-link to="/login" v-if="!isLoggedIn">
                        <b-button rounded outlined>Log in</b-button>
                    </router-link>


                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed:{
      ...mapState("user",["isLoggedIn", "user"])
  }
};
</script>

<style lang="scss" scoped>
.navbar{
    min-height: 4rem;

    .navbar-brand{
        a{
            padding: 0;
        }
    }
}
.user-avatar-wrapper{
    width: 30px;
    height:30px;
    border-radius: 50%;
    overflow: hidden;

    img{
        width:100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>