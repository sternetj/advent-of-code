import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) =>
    l
      .match(/(\d+),(\d+) -> (\d+),(\d+)/)
      .slice(1)
      .map(Number),
  __dirname,
  "input.txt",
);

const points = [];
let overlappedPoints = 0;

input.forEach(([x1, y1, x2, y2]) => {
  do {
    if (!points[y1]) points[y1] = [];

    if (points[y1][x1] === 1) {
      overlappedPoints++;
    }

    points[y1][x1] = (points[y1][x1] ?? 0) + 1;

    if (x1 === x2 && y1 === y2) break;

    if (x1 !== x2) x1 < x2 ? x1++ : x1--;
    if (y1 !== y2) y1 < y2 ? y1++ : y1--;
  } while (true);
});

console.log(overlappedPoints);
