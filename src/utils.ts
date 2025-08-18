export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function shuffleInPlace(input: Array<unknown>) {
  for (let i = 0; i < input.length; i++) {
    const randomIndex = getRandomInt(input.length);
    const tmp = input[i];
    input[i] = input[randomIndex];
    input[randomIndex] = tmp;
  }
}
