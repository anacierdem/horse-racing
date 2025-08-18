import { createStore } from 'vuex';
import type { Horse, Round } from './types';
import { shuffleInPlace } from '@/utils';

export const store = createStore<{
  raceSchedule: Round[];
}>({
  state() {
    return {
      raceSchedule: [],
      count: 0,
    };
  },
  mutations: {
    resetSchedule(state) {
      state.raceSchedule = [];
    },
    appendRoundFromHorsePool(state, payload: { pool: readonly Horse[]; length: number }) {
      const shuffledPool = [...payload.pool];
      shuffleInPlace(shuffledPool);
      state.raceSchedule.push({
        horses: shuffledPool.slice(0, 10),
        length: payload.length,
      });
    },
  },

  actions: {
    createSchedule(context, payload: { pool: readonly Horse[] }) {
      context.commit('resetSchedule');
      for (let i = 0; i < 6; i++) {
        // TODO: This doesn't look like it is properly typed
        context.commit('appendRoundFromHorsePool', {
          pool: payload.pool,
          length: 1200 + 200 * i,
        });
      }
    },
  },
});
