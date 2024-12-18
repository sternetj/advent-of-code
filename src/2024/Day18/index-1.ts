import { aStar } from "../../util/a-star";
import { parseInput } from "../../util/parse-input";

const bytes = parseInput((l) => l.split(",").map(Number));

let DIMENSION = process.env.INPUT.includes("test") ? 6 : 70;
let BYTES_TO_PROCESS = process.env.INPUT.includes("test") ? 12 : 1024;

let map = new Array(DIMENSION + 1)
  .fill(".")
  .map(() => new Array(DIMENSION + 1).fill("."));

while (BYTES_TO_PROCESS-- > 0) {
  const [x, y] = bytes.shift();
  map[y][x] = "#";
}

let path = aStar({
  start: [0, 0],
  end: [DIMENSION, DIMENSION],
  map,
  isValidSpace: (space) => space === ".",
  heuristic: ([x, y]) => Math.abs(x - DIMENSION) + Math.abs(y - DIMENSION),
});

console.log(path.length - 1);
