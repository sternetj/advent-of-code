import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => {
  const v = Number(l.split(": ")[0]);
  const nums = l.split(": ")[1].split(" ").map(Number);
  return [v, nums] as const;
});

const calculate = (nums: number[], ops: string[]) => {
  return ops.reduce((t, op, i) => {
    if (op === "+") {
      return t + nums[i + 1];
    } else if (op === "||") {
      return Number(`${t}` + nums[i + 1]);
    } else {
      return t * nums[i + 1];
    }
  }, nums[0]);
};

console.log(
  input
    .filter(([v, nums]) => {
      const ops = new Array(nums.length - 1).fill("*");

      for (let i = 0; i < 3 ** ops.length; i++) {
        for (let j = 0; j < ops.length; j++) {
          const bit = Number(i.toString(3).split("").reverse()[j]);
          if (bit === 0) {
            ops[j] = "*";
          } else if (bit === 1) {
            ops[j] = "+";
          } else if (bit === 2) {
            ops[j] = "||";
          }
        }

        if (calculate(nums, ops) === v) {
          return true;
        }
      }

      return false;
    })
    .reduce((t, [v]) => t + v, 0),
);
