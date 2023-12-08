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

const START = "AAA";
const END = "ZZZ";

let currentSpot = START;
let currentStep = -1;

while (currentSpot !== END) {
  currentStep++;
  currentSpot = map[currentSpot][dirs[currentStep % dirs.length]];
}

console.dir(currentStep + 1);
