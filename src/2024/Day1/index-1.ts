import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("   ").map(Number));

const sortedA = input.map(([a]) => a).sort();
const sortedB = input.map(([_, b]) => b).sort();

console.log(
  sortedA.reduce((total, a, i) => total + Math.abs(a - sortedB[i]), 0),
);
