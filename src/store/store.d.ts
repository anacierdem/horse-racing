import { Store } from 'vuex';

declare module 'vue' {
  // declare your own store states
  interface State {
    horses: Horse[];
    raceSchedule: Round[];
    raceResults: Round[];
    raceNo: number;
    outcomes: RaceOutcome[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
