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

const straightLines = input.filter(
  ([x1, y1, x2, y2]) => x1 === x2 || y1 === y2,
);

const points = [];
let overlappedPoints = 0;

straightLines.forEach((line) => {
  let minX = Math.min(line[0], line[2]);
  let minY = Math.min(line[1], line[3]);
  let maxX = Math.max(line[0], line[2]);
  let maxY = Math.max(line[1], line[3]);

  do {
    if (!points[minY]) points[minY] = new Array(9).fill(undefined);

    if (points[minY][minX] === 1) {
      overlappedPoints++;
    }

    points[minY][minX] = (points[minY][minX] ?? 0) + 1;

    if (minX === maxX && minY === maxY) break;

    if (minX < maxX) minX++;
    if (minY < maxY) minY++;
  } while (true);
});

console.log(overlappedPoints);
