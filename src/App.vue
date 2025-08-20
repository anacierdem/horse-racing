<script lang="ts">
import HorseList from '@/components/HorseList.vue';
import RaceDisplay from '@/components/RaceDisplay.vue';
import type { Round } from './store/types';
import CurrentRace from './components/CurrentRace.vue';

export default {
  methods: {
    createSchedule() {
      this.$store.dispatch('createSchedule');
    },
    simulate() {
      this.$store.commit('simulateRace');
    },
  },
  computed: {
    raceSchedule(): Round[] {
      return this.$store.state.raceSchedule as Round[];
    },
    raceResults(): Round[] {
      return this.$store.state.raceResults as Round[];
    },
    isFinished(): boolean {
      return this.$store.getters.isFinished;
    },
    isScheduled(): boolean {
      return this.$store.getters.isScheduled;
    },
  },
  components: {
    HorseList,
    RaceDisplay,
    CurrentRace,
  },
};
</script>

<template>
  <header></header>

  <main>
    <button v-on:click="createSchedule" :disabled="isScheduled">
      Generate
    </button>
    <button v-on:click="simulate" :disabled="isFinished">Start</button>
    <div class="main-wrapper">
      <HorseList />
      <CurrentRace />
      <RaceDisplay header="Schedule" :races="raceSchedule" />
      <RaceDisplay header="Results" :races="raceResults" />
    </div>
  </main>
</template>

<style scoped>
.main-wrapper {
  display: flex;
  align-items: start;
  gap: 10px;
}
</style>
