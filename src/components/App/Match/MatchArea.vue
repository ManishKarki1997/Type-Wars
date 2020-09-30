<template>
  <div class="h-full bg-white rounded shadow">
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sunt aliquam vero odit
            iusto dolores esse eligendi soluta mollitia atque? Quae beatae placeat ratione
            laudantium facere neque accusamus, omnis quo saepe nobis! Sit, maiores culpa.
          </p>
          <template #tooltip> Opponent's progress </template>
        </vs-tooltip>
      </div>
    </div>

    <div class="px-4 py-4 mt-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus recusandae quas est
        assumenda illum sapiente atque culpa soluta vero error a cum, corrupti repudiandae ut amet
        doloremque eveniet itaque, laudantium aliquam quibusdam? Similique aut deleniti magnam ipsam
        quibusdam dolorum?
      </p>
    </div>

    <div class="w-full px-4 py-4 rounded mt-4">
      <textarea
        autofocus
        class="bg-gray-100 w-full px-4 py-4 rounded shadow"
        name="typing-textbox"
        id="typing-textbox"
        cols="30"
        rows="10"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
