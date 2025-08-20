<script lang="ts">
import HorseList from '@/components/HorseList.vue';
import RaceDisplay from '@/components/RaceDisplay.vue';
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
    raceSchedule() {
      return this.$store.state.raceSchedule;
    },
    raceResults() {
      return this.$store.state.raceResults;
    },
    isFinished() {
      return this.$store.getters.isFinished;
    },
    isScheduled() {
      return this.$store.getters.isScheduled;
    },
    haveRace() {
      return this.$store.getters.haveRace;
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
    <button
      v-on:click="simulate"
      :disabled="isFinished || haveRace || !isScheduled"
    >
      Start
    </button>
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
