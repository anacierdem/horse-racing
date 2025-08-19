<script lang="ts">
import HorseList from '@/components/HorseList.vue';
import RaceDisplay from '@/components/RaceDisplay.vue';
import type { Round } from './store/types';

export default {
  methods: {
    // TODO: Types doesn't work for the store
    // https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript doesn't work
    createSchedule() {
      this.$store.dispatch('createSchedule');
    },
    simulate() {
      this.$store.commit('simulateRace');
    },
    commit() {
      this.$store.commit('commitRace');
    },
  },
  computed: {
    raceSchedule(): Round[] {
      return this.$store.state.raceSchedule as Round[];
    },
    raceResults(): Round[] {
      return this.$store.state.raceResults as Round[];
    },
  },
  components: {
    HorseList,
    RaceDisplay,
  },
};
</script>

<template>
  <header></header>

  <main>
    <button v-on:click="createSchedule">Generate schedule</button>
    <button v-on:click="simulate">Simulate</button>
    <button v-on:click="commit">Commit</button>
    <div class="main-wrapper">
      <HorseList />
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
