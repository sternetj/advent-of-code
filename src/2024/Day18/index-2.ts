import { parseInput } from "../../util/parse-input";
import { aStar } from "../../util/a-star";

const bytes = parseInput((l) => l.split(",").map(Number));

let DIMENSION = process.env.INPUT.includes("test") ? 6 : 70;

let map = new Array(DIMENSION + 1)
  .fill(".")
  .map(() => new Array(DIMENSION + 1).fill("."));

for (const [x, y] of bytes) {
  map[y][x] = "#";
}

let problemByte = bytes[bytes.length - 1];
while (true) {
  const path = aStar({
    start: [0, 0],
    end: [DIMENSION, DIMENSION],
    map,
    isValidSpace: (space) => space === ".",
    heuristic: ([x, y]) => Math.abs(x - DIMENSION) + Math.abs(y - DIMENSION),
  });

  if (path.length) {
    break;
  }

  problemByte = bytes.pop();
  map[problemByte[1]][problemByte[0]] = ".";
}

console.log(problemByte.join(","));
