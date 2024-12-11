import { parseInput } from "../../util/parse-input";

let [map] = parseInput((l) => l.split(" ").map(Number));

let cached: Record<string, number> = {};

const getResultingStonesForBlinks = (num: number, blinks = 75) => {
  const key = `${num}-${blinks}`;
  if (cached[key]) return cached[key];

  let resultingStones = 1;
  while (blinks-- > 0) {
    const sNum = `${num}`;
    if (num === 0) {
      num = 1;
    } else if (sNum.length % 2 === 0) {
      num = +sNum.slice(0, sNum.length / 2);
      const num2 = +sNum.slice(sNum.length / 2);
      resultingStones += getResultingStonesForBlinks(num2, blinks);
    } else {
      num *= 2024;
    }
  }

  cached[key] = resultingStones;

  return resultingStones;
};

console.log(
  map.reduce((total, n) => total + getResultingStonesForBlinks(n), 0),
);
