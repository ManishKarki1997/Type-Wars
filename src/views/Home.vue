<template>
  <div class="home">
    <Navbar/>
    <h4>Type<span>Wars</span></h4>
    <p>An online multiplayer competitive typing game.</p>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
};
</script>
