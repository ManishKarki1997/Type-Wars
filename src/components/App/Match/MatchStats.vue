<template>
  <div class="w-full flex flex-col">
    <div class="w-full bg-white rounded shadow flex hover:shadow-md">
      <div class="w-3/12 h-24">
        <img :src="opponentDetails.avatar" alt="" class="w-full h-full rounded-sm object-cover" />
      </div>
      <div class="w-9/12 px-4 py-2 flex justify-between">
        <div>
          <h3 class="font-bold text-xl">{{ opponentDetails.name }}</h3>
          <p class="text-gray-600 text-sm -mt-2">
            @<span>{{ opponentDetails.username }}</span>
          </p>
        </div>
        <div>
          <vs-tooltip circle top class="flex items-center w-6 mt-2 cursor-pointer">
            <SmileIcon class="w-6 h-6" />
            <template #tooltip> Taunt {{ opponentDetails.username }} with a gif </template>
          </vs-tooltip>
        </div>
      </div>
    </div>

    <div class="shadow bg-white rounded-lg px-4 py-4 my-16 hover:shadow-md">
      <div class="flex align-center justify-evenly">
        <h2 class="font-bold text-3xl">97</h2>

        <h2 class="font-bold text-4xl">75%</h2>

        <h2 class="font-bold text-3xl">80%</h2>
      </div>
      <div class="flex items-center justify-evenly my-1">
        <p>WPM</p>
        <p>Completed</p>
        <p>Accuracy</p>
      </div>

      <div class="flex align-center justify-evenly">
        <h2 class="font-bold text-3xl">90</h2>

        <h2 class="font-bold text-4xl">80%</h2>

        <h2 class="font-bold text-3xl">85%</h2>
      </div>
    </div>

    <div class="w-full bg-white rounded shadow flex hover:shadow-md">
      <div class="w-3/12 h-24">
        <img :src="user.avatar" alt="" class="w-full h-full rounded-sm object-cover" />
      </div>
      <div class="w-9/12 px-4 py-2 flex justify-between">
        <div>
          <h3 class="font-bold text-xl">{{ user.name }}</h3>
          <p class="text-gray-600 text-sm -mt-2">
            @<span>{{ user.username }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SmileIcon from "@/assets/icons/smile.svg";

export default {
  components: {
    SmileIcon,
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("game", ["activeGameDetails"]),
    opponentDetails() {
      return this.activeGameDetails[
        Object.keys(this.activeGameDetails).find(
          (key) => this.activeGameDetails[key].email !== this.user.email
        )
      ];
    },
  },
};
</script>
