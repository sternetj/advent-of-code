import { parseInput } from "../../util/parse-input";

const rocks = parseInput(
  (line) => line.split(" -> ").map((v) => v.split(",").map(Number)),
  __dirname,
  process.env.INPUT
);

const map: Record<string, true> = {};

const key = (x: number, y: number) => `${x},${y}`;

let maxY = 0;

rocks.forEach((lines) => {
  while (lines.length > 1) {
    let [[x, y], [endX, endY]] = lines;
    map[key(x, y)] = true;
    maxY = Math.max(maxY, y);

    while (x != endX) {
      x += endX > x ? 1 : -1;
      map[key(x, y)] = true;
    }
    while (y != endY) {
      y += endY > y ? 1 : -1;
      map[key(x, y)] = true;
      maxY = Math.max(maxY, y);
    }

    lines.splice(0, 1);
  }
});

const rockSize = Object.keys(map).length;
const sandStart = [500, 0];
let [sx, sy] = sandStart;

while (true) {
  sy++;

  if (sy > maxY) break;

  if (!map[key(sx, sy)]) continue;
  if (!map[key(sx - 1, sy)]) {
    sx--;
  } else if (!map[key(sx + 1, sy)]) {
    sx++;
  } else {
    map[key(sx, sy - 1)] = true;
    [sx, sy] = sandStart;
  }
}

console.log(Object.keys(map).length - rockSize);
