import { parseInput } from "../../util/parse-input";

let input = parseInput(Number, __dirname, "input.txt").sort();

input = [0, ...input.sort((a, b) => a - b)];
input.push(input[input.length - 1] + 3);

const diffs = {};

input.forEach((v, i) => {
  const diff = input[i + 1] - v;
  diffs[diff] = (diffs[diff] || 0) + 1;
});

console.log(diffs[1] * diffs[3]);
