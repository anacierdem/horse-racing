import { getRandomInt, shuffleInPlace } from '@/utils';

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

shuffleInPlace(colors);

// TODO: do not use same names more than once
export const horseList = Array.from({ length: 20 }).map((_, i) => ({
  name: `${horses[getRandomInt(horses.length)]} ${jockeys[getRandomInt(jockeys.length)]}`,
  condition: getRandomInt(99) + 1,
  color: colors[i],
}));
