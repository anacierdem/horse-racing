import { createStore } from 'vuex';
import type { Round } from './types';
import { getRandomInt, shuffleInPlace } from '@/utils';
import { horseList } from './initialData';
import { HORSE_PER_RACE, TOTAL_ROUNDS } from '@/constants';
import type { State } from 'vue';

// Bigger the value, bigger for surprises
const LUCK_FACTOR = 20;

// After each race, this much condition is replenished
const REPLENISH_CONDITION_PER_ROUND = 5;

// Everytime a horse runs this amount, it'll loose 1 condition
const CONDITION_PER_TRACK_LENGTH = 100;

export const store = createStore<State>({
  state() {
    return {
      horses: horseList,
      raceSchedule: [],
      raceResults: [],
      raceNo: -1,
      outcomes: [],
    };
  },

  getters: {
    currentRound(state) {
      return state.raceSchedule[state.raceNo];
    },
    isFinished(state) {
      return state.raceNo == TOTAL_ROUNDS - 1;
    },
    isScheduled(state) {
      return state.raceSchedule.length > 0;
    },
  },

  mutations: {
    appendRound(state, payload: { length: number }) {
      const shuffledPool = [...state.horses];
      shuffleInPlace(shuffledPool);
      state.raceSchedule.push({
        horses: shuffledPool.slice(0, HORSE_PER_RACE),
        length: payload.length,
      });
    },

    simulateRace(state) {
      state.raceNo++;
      const currentRound: Round = state.raceSchedule[state.raceNo];
      // No race left
      if (!currentRound) {
        return;
      }

      if (state.outcomes.length > 0) {
        return;
      }

      const cost = Math.round(currentRound.length / CONDITION_PER_TRACK_LENGTH);

      // Figure out positions and final conditions
      state.outcomes = currentRound.horses
        .map(({ condition }, index) => ({
          condition: Math.max(condition - cost, 0),
          index,
        }))
        .sort(
          (a, b) =>
            b.condition - a.condition + getRandomInt(LUCK_FACTOR) - LUCK_FACTOR,
        );
    },

    endRace(state) {
      if (state.outcomes.length == 0) {
        // TODO: assert instead of these early returns, these are error cases
        return;
      }

      const currentRaceResult: Round = {
        horses: [],
        // This won't be used, but it is here to make it compatible for the underlying component
        // TODO: find a better alternative
        length: 0,
      };
      const currentRound = state.raceSchedule[state.raceNo];
      for (let i = 0; i < state.outcomes.length; i++) {
        const currentPositionHorseIndex = state.outcomes[i].index;
        // Reflect back end race condition to actual horses
        currentRound.horses[currentPositionHorseIndex].condition =
          state.outcomes[i].condition;
        currentRaceResult.horses.push(
          currentRound.horses[currentPositionHorseIndex],
        );
      }

      state.raceResults.push(currentRaceResult);
      state.outcomes = [];

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
      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        // TODO: This doesn't look like it is properly typed
        context.commit('appendRound', {
          length: 1200 + 200 * i,
        });
      }
    },
  },
});
