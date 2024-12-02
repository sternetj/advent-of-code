import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(" ").map(Number));

const isSafe = (toProcess: number[], dir = 0, tol = 1, i = 0, prev?) => {
  toProcess = toProcess.filter((n) => n !== undefined);
  if (toProcess.length <= 1) {
    console.log("  Done", toProcess);
    return true;
  }

  const curr = toProcess[0];
  const next = toProcess[1];
  const dirToUse = i === 0 ? (curr < next ? 1 : -1) : dir;

  const diff = next - curr;
  const absDiff = Math.abs(diff);
  console.log(
    `  Verifying [${curr},${next}] ${absDiff < 1} ${absDiff > 3} ${
      diff / absDiff !== dirToUse
    } | ${diff} ${dirToUse}`,
  );
  if (absDiff < 1 || absDiff > 3 || diff / absDiff !== dirToUse) {
    if (tol === 0) return false;
    console.log(
      `  Replacing ${curr} or ${next} because ${absDiff < 1} ${absDiff > 3} ${
        diff / absDiff !== dirToUse
      }`,
    );
    console.log(`trying ${toProcess}`);
    console.log(`trying ${[curr, ...toProcess.slice(2)]}`);
    console.log(`trying ${[prev, ...toProcess.slice(1)]}`);
    return (
      isSafe(toProcess, dirToUse, tol - 1, i - 1) ||
      isSafe([curr, ...toProcess.slice(2)], dirToUse, tol - 1, i) ||
      isSafe([prev, ...toProcess.slice(1)], dirToUse, tol - 1, i)
    );
  }

  return isSafe([next, ...toProcess.slice(2)], dirToUse, tol, i + 1, curr);
};

console.log(input.filter((arr) => isSafe(arr)).length);

console.log(input.filter((arr) => !isSafe(arr)));

// 432 too low
// 437 not right
