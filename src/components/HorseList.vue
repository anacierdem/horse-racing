<script lang="ts">
import type { Horse } from '@/store/types';

// TODO: Types doesn't work for the store
// https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript doesn't work
export default {
  computed: {
    horses(): Horse[] {
      return this.$store.state.horses;
    },
  },
};
</script>

<template>
  <table>
    <caption>
      Horse List
    </caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Condition</th>
        <th scope="col">Color</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="horse in horses">
        <td scope="row">{{ horse.name }}</td>
        <td>{{ horse.condition }}</td>
        <!-- TODO: These have low color contrast -->
        <td :style="{ backgroundColor: horse.color }">{{ horse.color }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid;
}
</style>
