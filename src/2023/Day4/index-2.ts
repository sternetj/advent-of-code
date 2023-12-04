import { parseInput } from "../../util/parse-input";

const intersection = <T>(a: T[], b: T[]) => {
  const elements = new Set(a);
  return b.filter((e) => elements.has(e));
};

const cards = parseInput(
  (l) => {
    const cardId = +l.split(": ")[0].split(/Card \s*/)[1];
    const card = l.split(": ")[1].replaceAll("  ", " ").split(" | ");
    const winningNumbers = card[0].split(" ").map(Number);
    const scratchedNumbers = card[1].split(" ").map(Number);
    return {
      cardId,
      score: intersection(winningNumbers, scratchedNumbers).length,
    };
  },
  __dirname,
  process.env.INPUT
);

const toProcess = cards.slice();
const cardCounts: Record<string, number> = {};

while (toProcess.length) {
  const { cardId, score } = toProcess.pop();
  cardCounts[cardId] = (cardCounts[cardId] ?? 0) + 1;

  toProcess.push(...cards.slice(cardId, cardId + score));
}

console.log(Object.values(cardCounts).reduce((t, v) => t + v, 0));
