<script lang="ts">
import type { Round } from '@/store/types';
export default {
  props: {
    races: Array,
    header: String,
  },
};
</script>

<template>
  <table>
    <caption>
      {{
        header
      }}
    </caption>
    <thead>
      <tr>
        <th scope="col">Position</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(race, index) in races as Round[]">
        <!-- TODO: convert this to nth format -->
        <!-- These won't change order, so key is irrelevant -->
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <tr>
          <th colspan="2">LAP {{ index + 1 }}</th>
        </tr>

        <!-- These won't change order, so key is irrelevant -->
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <tr v-for="(horse, index) in race.horses">
          <td>{{ index + 1 }}</td>
          <td>{{ horse.name }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  min-width: 300px;
}

table,
th,
td {
  border: 1px solid;
}
</style>
