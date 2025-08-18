import { createStore } from 'vuex';
import type { Horse, Round } from './types';
import { getRandomInt, shuffleInPlace } from '@/utils';
import { horseList } from './initialData';

export const store = createStore<{
  horses: Horse[];
  raceSchedule: Round[];
  raceResults: string[][];
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
    resetSchedule(state) {
      state.currentRace = {
        horses: [],
        round: 0,
        simulated: false,
      };
      state.raceSchedule = [];
    },

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

      const cost = getRandomInt(10) + Math.round(currentRound.length / 300);

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

      state.raceResults.push(
        [...currentRound.horses]
          .sort((a, b) => a.condition - b.condition + getRandomInt(50) - 50)
          .map(({ name }) => name),
      );
      state.currentRace.round++;
      state.currentRace.simulated = false;
    },
  },

  actions: {
    createSchedule(context) {
      context.commit('resetSchedule');
      for (let i = 0; i < 6; i++) {
        // TODO: This doesn't look like it is properly typed
        context.commit('appendRound', {
          length: 1200 + 200 * i,
        });
      }
    },
  },
});
