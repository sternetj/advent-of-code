import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split("").map(Number),
  __dirname,
  "input.txt"
);

let riskSum = 0;

input.forEach((row, rIndex) => {
  row.forEach((cell, cIndex) => {
    const a = input[rIndex]?.[cIndex - 1] ?? Infinity;
    const b = input[rIndex]?.[cIndex + 1] ?? Infinity;
    const c = input[rIndex - 1]?.[cIndex] ?? Infinity;
    const d = input[rIndex + 1]?.[cIndex] ?? Infinity;
    if (cell < a && cell < b && cell < c && cell < d) {
      riskSum += cell + 1;
    }
  });
});

console.log(riskSum);
