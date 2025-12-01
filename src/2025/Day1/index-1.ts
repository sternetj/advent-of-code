import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => Number(l.replace("L", "-").replace("R", "")));

const result = input.reduce(
  ({ val, zeroCount }, current) => {
    const diff = val + current;
    val = (100 * Math.ceil(Math.abs(diff / 100)) + diff) % 100;
    zeroCount += !val ? 1 : 0;
    return { val, zeroCount };
  },
  { val: 50, zeroCount: 0 },
);

console.log(result.zeroCount);
