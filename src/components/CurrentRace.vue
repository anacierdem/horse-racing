<script lang="ts">
import type { RaceOutcome, Round } from '@/store/types';
import { defineComponent } from 'vue';

// TODO: Types doesn't work for the store
// https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript doesn't work
export default defineComponent({
  computed: {
    currentRound(): Round {
      return this.$store.getters.currentRound;
    },
    outcomes(): Record<number, number> {
      const positionLookup: Record<number, number> = {};
      const outcomes: RaceOutcome[] = this.$store.state.outcomes;
      for (let i = 0; i < outcomes.length; i++) {
        positionLookup[outcomes[i].index] = i;
      }
      return positionLookup;
    },
    raceNo(): number {
      return this.$store.state.raceNo;
    },
  },
  data(): { currentTick: number } {
    return {
      currentTick: 0,
    };
  },
  methods: {
    startAnimation() {
      // TODO: Fix typing properties on `this`
      this.interval = setInterval(() => {
        this.currentTick++;
        if (this.currentTick == 10) {
          this.stopAnimation();
          this.currentTick = 0;
          this.$store.commit('endRace');
        }
      }, 500);
    },
    stopAnimation() {
      clearInterval(this.interval);
      this.interval = undefined;
    },
  },
  beforeUpdate() {
    if (Object.keys(this.outcomes).length > 0 && !this.interval) {
      this.startAnimation();
    }
    console.log(this.currentTick);
  },
  unmounted() {
    this.stopAnimation();
  },
});
</script>

<template>
  <div class="container">
    {{ currentTick }}
    <div v-if="!currentRound">WAITING FOR SCHEDULE</div>
    <div v-if="currentRound">
      <!-- TODO: use nth notation -->
      LAP {{ raceNo + 1 }}:
    </div>
    <div class="lane-wrapper">
      <div v-if="!currentRound" v-for="index in 10" class="lane">
        <div class="lane-marker">
          {{ index }}
        </div>
      </div>

      <div
        v-if="currentRound"
        v-for="(_, index) in currentRound.horses"
        class="lane"
      >
        <div class="lane-marker">
          {{ index + 1 }}
        </div>
        <div
          class="horse"
          :style="`transform: translate(-${100 - currentTick * 10}%, 0) scaleX(-1)`"
        >
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
      transition: transform 0.5s;
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
