<script lang="ts">
import { HORSE_PER_RACE } from '@/constants';
import type { RaceOutcome, Round } from '@/store/types';
import { defineComponent } from 'vue';

const INTERVAL = 500;

// Scatter the amount run each tick. Higher number results in more drama, but
// too high and things will break and look ugly :)
const RANDOMNESS = 2;

// For this many initial ticks, horse behave randomly
const EXTRA_TICKS = 20;
// We need at least HORSE_PER_RACE ticks so that each horse can do its final move
const TOTAL_TICKS = HORSE_PER_RACE + EXTRA_TICKS;

// TODO: Types doesn't work for the store
// https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript doesn't work
export default defineComponent({
  data() {
    return {
      currentTick: 0,
      horsePositions: Array.from({ length: HORSE_PER_RACE }).fill(
        0,
      ) as number[],
      HORSE_PER_RACE,
    };
  },
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
  methods: {
    tick() {
      for (let i = 0; i < HORSE_PER_RACE; i++) {
        const perTick = 100 / TOTAL_TICKS;
        const currentCriticalTick = this.currentTick - EXTRA_TICKS;
        if (currentCriticalTick <= this.outcomes[i]) {
          // This horse can go a random amount as long as it doesn't go the last mile
          this.horsePositions[i] +=
            100 / (this.outcomes[i] + EXTRA_TICKS + 2) +
            (Math.random() - 0.5) * perTick * RANDOMNESS;
          // Don't let it visually win
          this.horsePositions[i] = Math.min(
            this.horsePositions[i],
            100 - perTick,
          );
        } else {
          // This horse should finish the race
          this.horsePositions[i] = 100;
        }
      }

      this.currentTick++;
      if (this.currentTick == TOTAL_TICKS + 2) {
        this.$store.commit('endRace');
        this.stopAnimation();
        this.currentTick = 0;
      }
    },
    startAnimation() {
      this.horsePositions = Array.from({ length: HORSE_PER_RACE }).fill(
        0,
      ) as number[];
      // TODO: Fix typing properties on `this`
      this.interval = setInterval(() => {
        this.tick();
      }, INTERVAL);
    },
    stopAnimation() {
      clearInterval(this.interval);
      this.interval = undefined;
    },
  },
  beforeUpdate() {},
  mounted() {
    this.$store.watch(
      (state) => {
        return state.outcomes; // could also put a Getter here
      },
      () => {
        if (Object.keys(this.outcomes).length > 0 && !this.interval) {
          this.startAnimation();
        }
      },
    );
  },
  unmounted() {
    this.stopAnimation();
  },
});
</script>

<!-- TODO: Add finish line animation for a clearer understanding -->
<template>
  <div class="container">
    <div v-if="Object.keys(outcomes).length == 0">WAITING FOR RACE</div>
    <div v-if="Object.keys(outcomes).length > 0">
      <!-- TODO: use nth notation -->
      LAP {{ raceNo + 1 }}:
    </div>
    <div class="lane-wrapper">
      <div v-for="(_, index) in this.horsePositions" class="lane">
        <div class="lane-marker">
          {{ index + 1 }}
        </div>

        <div
          class="horse"
          :class="currentTick == 0 ? '' : 'animate'"
          :style="`transform: translate(-${100 - this.horsePositions[index]}%, 0) scaleX(-1)`"
        >
          <!-- TODO: this glyph will look different based on the font, fix -->
          🐎
        </div>
      </div>

      <!-- TODO: Add a finish line -->
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 500px;
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
      &.animate {
        transition: transform 0.5s;
      }
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
