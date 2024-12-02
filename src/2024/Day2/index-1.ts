import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(" ").map(Number));

console.log(
  input.reduce((total, arr) => {
    const dir = arr[0] < arr[1] ? 1 : -1;
    const isSafe = arr.every((next, i) => {
      if (i === 0) return true;
      const prev = arr[i - 1];
      const diff = next - prev;
      const absDiff = Math.abs(diff);
      if (absDiff < 1 || absDiff > 3) return false;
      return diff / absDiff === dir;
    });

    return total + (isSafe ? 1 : 0);
  }, 0),
);
