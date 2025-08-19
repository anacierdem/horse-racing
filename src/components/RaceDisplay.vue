<script lang="ts">
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
      <template v-for="(race, index) in races">
        <!-- TODO: convert this to nth format -->
        <tr>
          <th colspan="2">LAP {{ index + 1 }}</th>
        </tr>

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
}

table,
th,
td {
  border: 1px solid;
}
</style>
