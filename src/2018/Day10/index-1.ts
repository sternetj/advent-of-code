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

function printPoints() {
  const xs = points.map(([x]) => x);
  const ys = points.map(([_, y]) => y);
  let minX = Math.min(...xs) - 1;
  let maxX = Math.max(...xs) + 2;
  let minY = Math.min(...ys) - 1;
  let maxY = Math.max(...ys) + 2;

  let lines = new Array(Math.abs(maxY - minY))
    .fill(1)
    .map(() => new Array(Math.abs(maxX - minX)).fill("."));

  points.forEach(([x, y]) => (lines[y - minY][x - minX] = "#"));

  lines.forEach(line => console.log(line.join("")));
}

while (!mightBeWords()) {
  points = points.map(([x, y, vx, vy]) => [x + vx, y + vy, vx, vy]);
}

printPoints();
