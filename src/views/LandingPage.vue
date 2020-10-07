<template>
  <div class="home">
    <Navbar />
    <section
      style="min-height: 90vh"
      class="w-full flex justify-center items-center"
    >
      <div class="text-center">
        <h4 class="font-bold text-3xl">
          Type<span class="text-blue-500 ml-1">Wars</span>
        </h4>
        <p class="text-lg mb-2">
          An online multiplayer competitive typing game.
        </p>
        <div class="shadow-lg w-1/2 mx-auto rounded overflow-hidden">
          <img class="w-full h-full" src="/typewars_demo.gif" />
        </div>
      </div>
    </section>
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
