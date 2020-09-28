<template>
  <div id="app">
    <Navbar class="navbar-container" />
    <router-view />
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
.navbar-container {
  margin-bottom: 4rem;
}
</style>
