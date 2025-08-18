<script setup>
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const horses = [
  'Fast & Flurrious',
  'Giddyup Giggles',
  'Nacho Stallion',
  'Donkey’s Cousin',
  'Clip Clopocalypse',
  'Hay Bale Houdini',
  'Whinny the Poo',
  'Turbo Haystack',
  'Sir Gallops-a-Lot',
  'Hay Fever',
  'Neigh Sayer',
  'Hoof Hearted',
  'Trotzilla',
  'Mane Attraction',
  'Oats McGoats',
  'Speedy Glue Stick',
];

const jockeys = [
  'Bumblesnuff',
  'Puddingworth',
  'Jigglesby',
  'Muffintop',
  'Wigglebottom',
  'Chumbleberry',
  'Dinglewhip',
  'Snortlepot',
  'Wigglesworth',
  'McSnort',
  'Butterpants',
  'Pickleback',
  'Fumbleton',
  'Snickerdoodle',
  'Wobblekins',
  'Crumpetbottom',
];

const colors = [
  'antiquewhite',
  'aquamarine',
  'blueviolet',
  'burlywood',
  'coral',
  'cornflowerblue',
  'darkgray',
  'darkgoldenrod',
  'darkolivegreen',
  'darkseagreen',
  'darkslategray',
  'deeppink',
  'indianred',
  'greenyellow',
  'indigo',
  'khaki',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'mediumorchid',
  'mediumspringgreen',
];

// Shuffle colors
for (let i = 0; i < colors.length; i++) {
  const randomIndex = getRandomInt(colors.length);
  const tmp = colors[i];
  colors[i] = colors[randomIndex];
  colors[randomIndex] = tmp;
}

// TODO: do not use same names more than once
const horseList = Array.from({ length: 20 }).map((_, i) => ({
  name: `${horses[getRandomInt(horses.length)]} ${jockeys[getRandomInt(jockeys.length)]}`,
  condition: Math.floor(Math.random() * 100 + 1),
  color: colors[i],
}));
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
      <tr v-for="horse in horseList">
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
