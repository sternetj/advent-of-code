import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => v.split(",").map((r) => r.split("-").map(Number)),
  __dirname,
  process.env.INPUT,
);

const pairsWithOverlap = input.filter(([[x1, y1], [x2, y2]]) => {
  return (x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1);
});

console.log(pairsWithOverlap.length);
