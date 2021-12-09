import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split("").map(Number),
  __dirname,
  "input.txt"
);

const computeBasinSize = (r: number, c: number, visited = {}) => {
  const key = `${r},${c}`;

  if (visited[key] || (input[r]?.[c] ?? 9) === 9) return 0;

  visited[key] = true;

  return (
    1 +
    computeBasinSize(r, c - 1, visited) +
    computeBasinSize(r, c + 1, visited) +
    computeBasinSize(r - 1, c, visited) +
    computeBasinSize(r + 1, c, visited)
  );
};

const basins = [];

input.forEach((row, rIndex) => {
  row.forEach((cell, cIndex) => {
    const a = input[rIndex]?.[cIndex - 1] ?? Infinity;
    const b = input[rIndex]?.[cIndex + 1] ?? Infinity;
    const c = input[rIndex - 1]?.[cIndex] ?? Infinity;
    const d = input[rIndex + 1]?.[cIndex] ?? Infinity;
    if (cell < a && cell < b && cell < c && cell < d) {
      basins.push(computeBasinSize(rIndex, cIndex));
    }
  });
});

console.log(
  basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((v, b) => v * b, 1)
);
