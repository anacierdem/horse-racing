<script lang="ts">
import HorseList from '@/components/HorseList.vue';

export default {
  methods: {
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
  components: {
    HorseList,
  },
};
</script>

<template>
  <header></header>

  <main>
    <div>
      <HorseList />
      <button v-on:click="createSchedule">Generate schedule</button>
      <button v-on:click="simulate">Simulate</button>
      <button v-on:click="commit">Commit</button>
    </div>
  </main>
</template>

<style scoped></style>
