import { parseInput } from "../../util/parse-input";

const [dirs, ...mapRaw] = parseInput(
  (l) => {
    if (!l.includes("=")) return l.split("").map((v) => (v === "L" ? 0 : 1));
    const [_, key, left, right] = l.match(/(.+) = \((.+), (.+)\)/);
    return [key, [left, right]];
  },
  __dirname,
  process.env.INPUT
) as [(0 | 1)[], [string, [string, string]][]];

const map = Object.fromEntries(mapRaw);

const getEndingPeriods = (spot: string) => {
  const seen = {};
  let currentStep = 0;
  let currentSpot = spot;
  let visited = [];

  while (!seen[`${currentSpot}|${currentStep % dirs.length}`]) {
    seen[`${currentSpot}|${currentStep % dirs.length}`] = true;
    visited.push(currentSpot);

    currentSpot = map[currentSpot][dirs[currentStep % dirs.length]];
    currentStep++;
  }

  //find first instance of currentSpot
  // find all Zs inside - or outside?
  // return base (initial currentSpot) and periods
  const base = visited.indexOf(currentSpot);

  return {
    base: base - 1,
    period: visited
      .slice(base)
      .map((v, i) => (v.endsWith("Z") ? i + 1 : -1))
      .find((v) => v > -1),
  };
};

let spots = Object.keys(map).filter((k) => k.endsWith("A"));
let periods = spots.map(getEndingPeriods);
console.log(periods);
