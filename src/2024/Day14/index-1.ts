import { parseInput } from "../../util/parse-input";

let input = parseInput((l) =>
  l
    .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
    .slice(1)
    .map(Number),
);

const HEIGHT = process.env.INPUT.includes("test") ? 7 : 103;
const WIDTH = process.env.INPUT.includes("test") ? 11 : 101;
const SECONDS = 100;

input = input.map(([px, py, vx, vy]) => {
  let x = px + vx * SECONDS;
  let y = py + vy * SECONDS;
  x %= WIDTH;
  y %= HEIGHT;
  x += x < 0 ? WIDTH : 0;
  y += y < 0 ? HEIGHT : 0;
  return [x, y];
});

const quadrants = { 1: 0, 2: 0, 3: 0, 4: 0 };

const midX = Math.floor(WIDTH / 2);
const midY = Math.floor(HEIGHT / 2);

for (let [x, y] of input) {
  if (x === midX || y === midY) continue;

  let q = 0;
  if (x < midX && y < midY) {
    q = 1;
  } else if (x > midX && y < midY) {
    q = 2;
  } else if (x < midX && y > midY) {
    q = 3;
  } else if (x > midX && y > midY) {
    q = 4;
  }

  quadrants[q]++;
}

console.log(quadrants);
console.log(Object.values(quadrants).reduce((a, b) => a * b, 1));
