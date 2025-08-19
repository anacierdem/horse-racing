<script lang="ts">
import type { Race } from '@/store/types';

// TODO: Types doesn't work for the store
// https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript doesn't work
export default {
  computed: {
    currentRace() {
      return this.$store.state.currentRace as Race;
    },
  },
  data() {
    return {
      currentTime: 0,
    };
  },
};
</script>

<template>
  <div class="container">
    <div>
      <!-- TODO: use nth notation -->
      LAP {{ currentRace.no + 1 }}:
    </div>
    <div class="lane-wrapper">
      <div v-for="(horse, index) in currentRace.round.horses" class="lane">
        <div class="lane-marker">
          {{ index + 1 }}
        </div>
        <div class="horse" :style="`transform: translate(-100%, 0) scaleX(-1)`">
          <!-- TODO: this glyph will look different based on the font, fix -->
          🐎
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.lane-wrapper {
  display: flex;
  flex-direction: column;

  & .lane {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: yellowgreen;
    &:not(:last-child) {
      border-bottom: 1px dashed black;
    }

    & .horse {
      font-size: 35px;
      line-height: 35px;
      align-self: center;
      width: 100%;
    }
  }

  & .lane-marker {
    border: 2px solid white;
    flex-shrink: 1;
    writing-mode: sideways-lr;
    padding: 5px;
    text-align: center;
  }
}
</style>
