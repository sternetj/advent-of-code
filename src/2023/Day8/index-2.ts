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

  while (
    !seen[`${currentSpot}|${currentStep % dirs.length}`] ||
    !currentSpot.endsWith("Z")
  ) {
    seen[`${currentSpot}|${currentStep % dirs.length}`] = true;
    visited.push(currentSpot);

    currentSpot = map[currentSpot][dirs[currentStep % dirs.length]];
    currentStep++;
  }
  visited.push(currentSpot);

  return visited.indexOf(currentSpot);
};

let spots = Object.keys(map).filter((k) => k.endsWith("A"));
let periods = spots.map(getEndingPeriods);

type NumFunc = (a: number, b: number) => number;
const gcd: NumFunc = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm: NumFunc = (a = 1, b = 1) => (a / gcd(a, b)) * b;

console.log(periods.reduce(lcm));
