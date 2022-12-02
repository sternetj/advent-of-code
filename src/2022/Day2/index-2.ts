import { parseInput } from "../../util/parse-input";

const toMove = (s: string) => {
  if (s === "A") return 1;
  if (s === "B") return 2;
  if (s === "C") return 3;
};

const input = parseInput(
  (v) => [toMove(v[0]), v[2]] as [number, string],
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

const finalScore = input.reduce((total, [them, expectedOutcome]) => {
  let you = them - 1;
  if (expectedOutcome === "X") you = you < 1 ? 3 : you;
  if (expectedOutcome === "Y") you = them;
  if (expectedOutcome === "Z") you = (them + 1) % 4 || 1;

  return total + you + getOutcomeScore(them, you);
}, 0);

console.log(finalScore);
