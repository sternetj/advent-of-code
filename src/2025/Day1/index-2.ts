import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => Number(l.replace("L", "-").replace("R", "")));

const result = input.reduce(
  ({ val, clickCount }, shift) => {
    const sign = shift < 0 ? -1 : 1;
    while (Math.abs(shift) > 100) {
      clickCount++;
      shift += -sign * 100;
    }
    let next = val + shift;
    clickCount += next < 0 && val ? 1 : 0;
    clickCount += next > 100 ? 1 : 0;
    next = next < 0 ? 100 + (next % 100) : next % 100;
    clickCount += next === 0 ? 1 : 0;
    return { val: next, clickCount };
  },
  { val: 50, clickCount: 0 },
);

console.log(result.clickCount);
