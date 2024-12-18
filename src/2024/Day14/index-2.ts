import { parseInput } from "../../util/parse-input";

let input = parseInput((l) =>
  l
    .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
    .slice(1)
    .map(Number),
);

const HEIGHT = process.env.INPUT.includes("test") ? 7 : 103;
const WIDTH = process.env.INPUT.includes("test") ? 11 : 101;
let seconds = 0;

while (true) {
  seconds++;
  input = input.map(([px, py, vx, vy]) => {
    px += vx;
    py += vy;
    px %= WIDTH;
    py %= HEIGHT;
    px += px < 0 ? WIDTH : 0;
    py += py < 0 ? HEIGHT : 0;

    return [px, py, vx, vy];
  });

  let points = 0;
  input.forEach(([x, y]) => {
    const isOneAway = (a, b) => Math.abs(a - b) <= 1;
    const indexA = input.findIndex(
      ([px, py]) =>
        !(px === x && py === y) && isOneAway(px, x) && isOneAway(py, y),
    );

    if (indexA === -1) return;

    const indexB = input
      .slice(indexA)
      .findIndex(
        ([px, py]) =>
          !(px === x && py === y) && isOneAway(px, x) && isOneAway(py, y),
      );

    if (indexB === -1) return;

    points++;
  });

  if (points >= (2 * input.length) / 3) {
    let map = new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill("."));
    console.log(seconds);
    input.forEach(([x, y]) => (map[y][x] = "#"));
    console.log(map.map((r) => r.join("")).join("\n"));
    break;
  }
}
