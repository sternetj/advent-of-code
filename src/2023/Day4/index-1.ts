import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => {
    const card = l.split(": ")[1].replaceAll("  ", " ").split(" | ");
    const winningNumbers = card[0].split(" ").map(Number);
    const scratchedNumbers = card[1].split(" ").map(Number);
    return { winningNumbers, scratchedNumbers };
  },
  __dirname,
  process.env.INPUT
);

const intersection = <T>(a: T[], b: T[]) => {
  const elements = new Set(a);
  return b.filter((e) => elements.has(e));
};

const totals = input.map(({ scratchedNumbers, winningNumbers }) => {
  const matches = intersection(winningNumbers, scratchedNumbers).length;

  if (matches) {
    return Math.pow(2, matches - 1);
  }

  return 0;
});

console.log(totals.reduce((t, v) => t + v, 0));
