import { parseInput } from "../../util/parse-input";

const wordHeight = 18;
let points = parseInput(
  v => {
    let [x, y, vx, vY] = v
      .match(
        /position=<\s?(-?\d+), \s?(-?\d+)> velocity=<\s?(-?\d+), \s?(-?\d+)>/
      )
      .slice(1)
      .map(Number);

    return [x, y, vx, vY];
  },
  __dirname,
  "input.txt"
);

function mightBeWords() {
  const ys = points.map(([_, y]) => y);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  return Math.abs(maxY - minY) <= wordHeight;
}

let seconds = 0;
while (!mightBeWords()) {
  points = points.map(([x, y, vx, vy]) => [x + vx, y + vy, vx, vy]);
  seconds++;
}

console.log("Would have take: ", seconds);
