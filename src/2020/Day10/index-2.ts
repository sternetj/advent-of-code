import { parseInput } from "../../util/parse-input";

let input = parseInput(Number, __dirname, "input.txt").sort();

input = [...input.sort((a, b) => a - b)];
input.push(input[input.length - 1] + 3);

const paths = {};

const computePaths = (previous: number, remaining: number[]) => {
  let total = remaining.length === 1 ? 1 : 0;
  let left = remaining.slice();
  if (paths[previous]) return paths[previous];
  while (left[0] - previous <= 3) {
    const v = left.shift();

    total += computePaths(v, left);
  }

  paths[previous] = total;

  return paths[previous];
};

console.log(computePaths(0, input));
