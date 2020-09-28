<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <h4>Type<span>Wars</span></h4>
      <p>An online multiplayer competitive typing game.</p>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>
