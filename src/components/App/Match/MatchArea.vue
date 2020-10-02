<template>
  <div class="h-full bg-white rounded shadow-lg">
    <div class="bg-gray-100 rounded px-4 py-4 flex items-center hover:shadow-md">
      <div class="w-1/6">
        <vs-tooltip circle top>
          <vs-avatar circle size="50" badge badge-color="success">
            <img :src="opponentDetails.avatar" :alt="opponentDetails.name + ' avatar image'" />
          </vs-avatar>
          <template #tooltip> {{ opponentDetails.name }} </template>
        </vs-tooltip>
      </div>
      <div class="5/6">
        <vs-tooltip circle top>
          <p class="opponent-typed-text-p"></p>
          <template #tooltip> Opponent's progress </template>
        </vs-tooltip>
      </div>
    </div>

    <div class="px-4 py-4 mt-4">
      <span
        v-for="(letter, index) in textToType"
        :key="'letter-' + index"
        :class="`text-${index}`"
        >{{ letter }}</span
      >
    </div>

    <div class="w-full px-4 py-4 rounded mt-4">
      <textarea
        autofocus
        class="bg-gray-100 w-full px-4 py-4 rounded shadow"
        name="typing-textbox"
        id="typing-textbox"
        cols="30"
        rows="10"
        v-model="userTypedText"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
      textToType: [],
      userTypedText: "",
      gameCountdown: 0,
      accurateLettersTyped: 0,
      opponentTypedText: "",
      opponentTypedLetters: [],
    };
  },
  methods: {
    startGameCountdown() {
      setTimeout(() => {
        this.gameCountdown += 1;
        if (this.userTypedText.length > 0) {
          this.$store.commit("user/SET_USER_GAME_DETAILS", {
            ...this.userGameDetails,
            wpm: Math.floor(this.accurateLettersTyped / 5 / (this.gameCountdown / 60)),
          });
        }
        this.startGameCountdown();
      }, 1000);
    },
  },
  created() {
    const textToType = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus recusandae quas est
        assumenda illum sapiente atque culpa soluta vero error a cum, corrupti repudiandae ut amet
        doloremque eveniet itaque, laudantium aliquam quibusdam? Similique aut deleniti magnam ipsam
        quibusdam dolorum?`;

    this.textToType = textToType.split("");
    this.startGameCountdown();
  },

  sockets: {
    OPPONENT_TYPING_DATA(data) {
      const { typedText } = data;
      this.opponentTypedText = typedText;
    },
  },

  watch: {
    userTypedText: {
      immediate: true,
      deep: true,
      handler(newTypedLetter, oldTypedLetter) {
        if (this.textToType.length == 0) return;
        if (oldTypedLetter && !newTypedLetter) {
          oldTypedLetter.split("").forEach((letter, i) => {
            const currentTextElement = document.querySelector(`.text-${i}`);
            currentTextElement.classList.remove("bg-red-200");
            currentTextElement.classList.remove("bg-green-200");
          });
          this.$store.commit("user/SET_USER_GAME_DETAILS", {
            accuracy: 0,
            completion: 0,
            wpm: 0,
          });
          this.$socket.emit("MY_TYPING_DATA", {
            socketId: this.user.socketId,
            user: { ...this.user },
            accuracy: 0,
            wpm: 0,
            completion: 0,
            typedText: "",
            intendedTo: {
              ...this.opponentDetails,
            },
          });
          return;
        }
        if (!newTypedLetter) return;

        this.textToType.map((letter, i) => {
          if (i < newTypedLetter.length) {
            const currentTextElement = document.querySelector(`.text-${i}`);
            if (letter === newTypedLetter[i]) {
              currentTextElement.classList.add("bg-green-200");
              currentTextElement.classList.remove("bg-red-200");
            } else if (letter !== newTypedLetter[i]) {
              currentTextElement.classList.add("bg-red-200");
              currentTextElement.classList.remove("bg-green-200");
            }
          }
        });
        if (oldTypedLetter.length > newTypedLetter.length) {
          const lastDeletedLetterElement = document.querySelector(
            `.text-${oldTypedLetter.length - 1}`
          );
          lastDeletedLetterElement.classList.remove("bg-red-200");
          lastDeletedLetterElement.classList.remove("bg-green-200");
        }

        const textToTypeWhitespaceRemoved = this.textToType.join("");

        const accurateLettersTyped = textToTypeWhitespaceRemoved
          .split("")
          .filter((l, i) => l === newTypedLetter[i]).length;

        const accuracy = Math.floor((accurateLettersTyped / this.userTypedText.length) * 100) || 0;
        const completion = Math.floor((this.userTypedText.length / this.textToType.length) * 100);
        const wpm = Math.floor(accurateLettersTyped / 5 / (this.gameCountdown / 60));

        this.accurateLettersTyped = accurateLettersTyped;

        this.$store.commit("user/SET_USER_GAME_DETAILS", {
          accuracy,
          wpm,
          completion,
        });

        this.$socket.emit("MY_TYPING_DATA", {
          socketId: this.user.socketId,
          user: { ...this.user },
          accuracy,
          wpm,
          completion,
          typedText: this.userTypedText,
          intendedTo: {
            ...this.opponentDetails,
          },
        });
      },
    },

    opponentTypedText: {
      immediate: true,
      handler(newTypedText, oldTypedText) {
        // just entered the route. so don't proceed further since nothing is typed;
        if (!oldTypedText && !newTypedText) return;

        // user pressed backspace(i.e. deleted a word)
        if (oldTypedText && newTypedText && oldTypedText.length > newTypedText.length) {
          document.querySelector(`.opponent-text-${this.opponentTypedLetters.length - 2}`).remove();
          this.opponentTypedLetters.splice(this.opponentTypedLetters.length - 1);
        } else if (oldTypedText && !newTypedText) {
          // user selected all text and deleted them
          // so remove the text from the UI altogether
          document.querySelector(".opponent-typed-text-p").textContent = "";
          this.opponentTypedLetters = [];
        } else {
          // user is typing, so determine if the sequence is correct or not
          // and add relevant background color
          const newTypedLetter = newTypedText[newTypedText.length - 1];

          if (newTypedLetter === this.textToType[this.opponentTypedLetters.length]) {
            const spanElement = document.createElement("span");
            spanElement.classList.add("bg-green-200");
            spanElement.classList.add(`opponent-text-${this.opponentTypedLetters.length - 1}`);
            spanElement.textContent = newTypedLetter;
            document.querySelector(".opponent-typed-text-p").append(spanElement);
          } else {
            const spanElement = document.createElement("span");
            spanElement.classList.add("bg-red-200");
            spanElement.classList.add(`opponent-text-${this.opponentTypedLetters.length - 1}`);
            spanElement.textContent = newTypedLetter;
            document.querySelector(".opponent-typed-text-p").append(spanElement);
          }
          this.opponentTypedLetters.push(newTypedLetter);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  transition: all 0s ease-in-out !important;
}
</style>
