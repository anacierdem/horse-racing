import { createStore } from 'vuex';
import type { Horse, Round } from './types';
import { getRandomInt, shuffleInPlace } from '@/utils';
import { horseList } from './initialData';

// Bigger the value, bigger for surprises
const LUCK_FACTOR = 20;

// After each race, this much condition is replenished
const REPLENISH_CONDITION_PER_ROUND = 5;

// Everytime a horse runs this amount, it'll loose 1 condition
const CONDITION_PER_TRACK_LENGTH = 100;

export const store = createStore<{
  horses: Horse[];
  raceSchedule: Round[];
  raceResults: Round[];
  currentRace: {
    round: number;
    horses: Horse[];
    simulated: boolean;
  };
}>({
  state() {
    return {
      horses: horseList,
      currentRace: {
        round: 0,
        horses: [],
        simulated: false,
      },
      raceSchedule: [],
      raceResults: [],
    };
  },

  mutations: {
    appendRound(state, payload: { length: number }) {
      const shuffledPool = [...state.horses];
      shuffleInPlace(shuffledPool);
      state.raceSchedule.push({
        horses: shuffledPool.slice(0, 10),
        length: payload.length,
      });
    },

    simulateRace(state) {
      const currentRound = state.raceSchedule[state.currentRace.round];
      // No race left
      if (!currentRound) {
        return;
      }

      if (state.currentRace.simulated) {
        return;
      }

      const cost = Math.round(currentRound.length / CONDITION_PER_TRACK_LENGTH);

      state.currentRace.horses = [];
      for (let horse of currentRound.horses) {
        const horseCopy = { ...horse };
        horseCopy.condition -= cost;
        horseCopy.condition = Math.max(horseCopy.condition, 0);
        state.currentRace.horses.push(horseCopy);
      }

      state.currentRace.simulated = true;
    },

    commitRace(state) {
      if (!state.currentRace.simulated) {
        return;
      }

      const currentRound = state.raceSchedule[state.currentRace.round];
      for (let i = 0; i < state.currentRace.horses.length; i++) {
        currentRound.horses[i].condition = state.currentRace.horses[i].condition;
      }

      state.raceResults.push({
        horses: [...currentRound.horses].sort(
          (a, b) => b.condition - a.condition + getRandomInt(LUCK_FACTOR) - LUCK_FACTOR,
        ),
        // This won't be used, but it is here to make it compatible for the underlying component
        // TODO: find a better alternative
        length: currentRound.length,
      });
      state.currentRace.round++;
      state.currentRace.simulated = false;

      // Replenish condition
      for (let i = 0; i < state.horses.length; i++) {
        state.horses[i].condition += REPLENISH_CONDITION_PER_ROUND;
        state.horses[i].condition = Math.min(state.horses[i].condition, 100);
      }
    },
  },

  actions: {
    createSchedule(context) {
      if (context.state.raceSchedule.length > 0) {
        return;
      }
      for (let i = 0; i < 6; i++) {
        // TODO: This doesn't look like it is properly typed
        context.commit('appendRound', {
          length: 1200 + 200 * i,
        });
      }
    },
  },
});
