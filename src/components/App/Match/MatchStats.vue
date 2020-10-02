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
        <h2 class="font-bold lg:text-3xl md:text-2xl sm:text-xl">
          {{ opponentTypingDetails.wpm }}
        </h2>

        <h2 class="font-bold lg:text-4xl md:text-2xl sm:text-xl">
          {{ opponentTypingDetails.completion }}%
        </h2>

        <h2 class="font-bold lg:text-3xl md:text-2xl sm:text-xl">
          {{ opponentTypingDetails.accuracy }}%
        </h2>
      </div>
      <div class="flex items-center justify-evenly my-1">
        <p class="sm:text-xs md:text-sm lg:text-base">WPM</p>
        <p class="sm:text-xs md:text-sm lg:text-base">Completed</p>
        <p class="sm:text-xs md:text-sm lg:text-base">Accuracy</p>
      </div>

      <div class="flex align-center justify-evenly">
        <h2 class="font-bold lg:text-3xl md:text-2xl sm:text-xl">{{ userGameDetails.wpm }}</h2>

        <h2 class="font-bold lg:text-4xl md:text-2xl sm:text-xl text-4xl">
          {{ userGameDetails.completion }}%
        </h2>

        <h2 class="font-bold lg:text-3xl md:text-2xl sm:text-xl">
          {{ userGameDetails.accuracy }}%
        </h2>
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
    ...mapState("user", ["user", "userGameDetails"]),
    ...mapState("game", ["activeGameDetails"]),
    opponentDetails() {
      return this.activeGameDetails[
        Object.keys(this.activeGameDetails).find(
          (key) => this.activeGameDetails[key].email !== this.user.email
        )
      ];
    },
  },
  data() {
    return {
      opponentTypingDetails: {
        accuracy: 0,
        completion: 0,
        currentlyInIndex: 0,
        wpm: 0,
      },
    };
  },
  sockets: {
    OPPONENT_TYPING_DATA(data) {
      const { accuracy, completion, index, wpm } = data;
      this.opponentTypingDetails = {
        accuracy,
        completion,
        index,
        wpm,
      };
    },
  },
};
</script>
