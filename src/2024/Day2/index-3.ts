import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(" ").map(Number));

const check = (toProcess: number[]) => {
  const diffs = toProcess.map((num, i, a) => num - (a[i + 1] ?? 0));
  const dir = diffs[0] / Math.abs(diffs[0]);
  return diffs
    .slice(0, -1)
    .every(
      (diff) =>
        Math.abs(diff) >= 1 &&
        Math.abs(diff) <= 3 &&
        diff / Math.abs(diff) === dir,
    );
};

const isSafe = (toProcess: number[]) => {
  return (
    check(toProcess) ||
    toProcess.some((_, i) =>
      check([...toProcess.slice(0, i), ...toProcess.slice(i + 1)]),
    )
  );
};

console.log(input.filter((arr) => isSafe(arr)).length);
