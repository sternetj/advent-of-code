import { parseInput } from "../../util/parse-input";

const JOKER = 1;
const ACE = 13;

const getScore = (hand: number[]) => {
  const counts: Record<number, number> = {};
  hand.forEach((c) => (counts[c] = (counts[c] ?? 0) + 1));
  const values = Object.values(counts);
  const max = Math.max(...values);
  if (max >= 4) {
    return max + 1;
  } else if (max === 3) {
    return values.some((v) => v === 2) ? 4 : 3;
  } else if (values.filter((v) => v === 2).length > 1) {
    return 2;
  }

  return max === 2 ? 1 : 0;
};

const buildHands = (hand: number[]): number[][] => {
  if (hand[0] === JOKER) {
    let newHands = [];
    for (let c = 2; c <= ACE; c++) {
      newHands.push(
        ...buildHands(hand.slice(1)).map((newHand) => [c, ...newHand])
      );
    }
    return newHands;
  }

  if (hand.length <= 1) return [hand];

  return buildHands(hand.slice(1)).map((newHand) => [hand[0], ...newHand]);
};

const getMaxScore = (hand: number[]) =>
  buildHands(hand).reduce((max, h) => Math.max(max, getScore(h)), 0);

const input = parseInput(
  (v) => {
    const [handRaw, bid] = v.split(" ");
    const hand = handRaw.split("").map(
      (c) =>
        ({
          A: ACE,
          K: 12,
          Q: 11,
          J: JOKER,
          T: 10,
        }[c] ?? Number(c))
    );
    return { bid: +bid, hand, score: getMaxScore(hand) };
  },
  __dirname,
  process.env.INPUT
);

const result = input
  .sort((a, b) => {
    let aChecks = [a.score, ...a.hand];
    let bChecks = [b.score, ...b.hand];

    for (let i = 0; i < aChecks.length; i++) {
      let compare = aChecks[i] - bChecks[i];
      if (compare !== 0) {
        return compare;
      }
    }
    return 0;
  })
  .reduce((total, { bid }, i) => total + bid * (i + 1), 0);

console.dir(result);
if (result <= 250433516) {
  console.log("WRONG");
}
