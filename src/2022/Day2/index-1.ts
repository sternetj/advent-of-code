import { parseInput } from "../../util/parse-input";

const toMove = (s: string) => {
  switch (s) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
  }
};

const input = parseInput(
  (v) => [toMove(v[0]), toMove(v[2])],
  __dirname,
  process.env.INPUT
);

const getOutcomeScore = (them: number, you: number) => {
  if (them === you) return 3;
  if (them === 1 && you === 2) return 6;
  if (them === 2 && you === 3) return 6;
  if (them === 3 && you === 1) return 6;

  return 0;
};

const finalScore = input.reduce((total, [them, you]) => {
  return total + you + getOutcomeScore(them, you);
}, 0);

console.log(finalScore);
