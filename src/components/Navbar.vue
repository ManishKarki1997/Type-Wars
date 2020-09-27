<template>
    <b-navbar shadow>
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
                    <router-link to="/signup" class=" mr-4 ">
                        <b-button type="is-dark" rounded>Sign up</b-button>
                    </router-link>
                    <router-link to="/login">
                        <b-button rounded outlined>Log in</b-button>
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>