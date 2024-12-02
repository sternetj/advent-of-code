import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("   ").map(Number));

const occurrences: Record<number, number> = {};
input.forEach(([_, b]) => {
  occurrences[b] = (occurrences[b] || 0) + 1;
});

console.log(input.reduce((total, [a]) => total + a * (occurrences[a] ?? 0), 0));
