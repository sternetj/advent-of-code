import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => v.split(",").map((r) => r.split("-").map(Number)),
  __dirname,
  process.env.INPUT,
);

const between = (v: number, [x, y]: number[]) => x <= v && v <= y;

const pairsWithOverlap = input.filter(([rng1, rng2]) => {
  return (
    between(rng1[0], rng2) ||
    between(rng1[1], rng2) ||
    between(rng2[0], rng1) ||
    between(rng2[1], rng1)
  );
});

console.log(pairsWithOverlap.length);
