import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split(" ").map(Number),
  __dirname,
  process.env.INPUT
);

const getPrediction = (nums: number[]): number => {
  if (nums.every((v) => v === 0)) return 0;

  const newNums = nums.slice(1).map((v, i) => v - nums[i]);

  return nums.slice(-1)[0] + getPrediction(newNums);
};

console.dir(input.map(getPrediction).reduce((t, v) => t + v, 0));
