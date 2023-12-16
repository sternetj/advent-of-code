import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

const maxes: Record<number, number> = {};

const result = input.reduce((total, row, ri) => {
  return (
    total +
    row.reduce((tCol, cell, ci) => {
      maxes[ci] = maxes[ci] ?? 0;

      if (cell === "#" || cell === "O") {
        const newMax = cell === "#" ? ri + 1 : maxes[ci] + 1;
        const value = cell === "#" ? 0 : input.length - maxes[ci];
        maxes[ci] = newMax;
        return tCol + value;
      }

      return tCol;
    }, 0)
  );
}, 0);

console.log(result);
