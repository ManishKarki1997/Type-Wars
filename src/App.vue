<template>
  <div id="app">
    <Navbar class="navbar-container" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #f7fafc;
}
.navbar-container {
  margin-bottom: 4rem;
}
</style>
