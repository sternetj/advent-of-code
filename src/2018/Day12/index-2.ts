import { parseInput } from "../../util/parse-input";

class Pattern {
  constructor(public matches: string, public replaceWith: string) {}
}

(function() {
  let input = parseInput(
    (v, index) => {
      if (index === 0) return v.replace("initial state: ", "").trim();
      if (index === 1) return "";

      let parts = v.split(" => ");
      return new Pattern(parts[0], parts[1].trim());
    },
    __dirname,
    "input.txt"
  );

  const generations = 50000000000;
  let board = input[0] as string;
  let patterns: { [pattern: string]: string } = {};
  let previousSum = 0;
  let previousDiff = 0;
  let sameDiffCount = 0;
  (input.slice(2) as Pattern[])
    .filter(p => p.replaceWith === "#")
    .forEach(pattern => (patterns[pattern.matches] = pattern.replaceWith));
  let pots: { [index: number]: string } = {};
  board.split("").forEach((v, index) => {
    if (v === "#") {
      pots[index] = v;
    }
  });

  const getRowFor = index =>
    `${pots[index - 2] || "."}${pots[index - 1] || "."}${pots[index] ||
      "."}${pots[index + 1] || "."}${pots[index + 2] || "."}`;

  const getSum = pots => {
    return Object.entries(pots).reduce((sum, [index, value]) => {
      if (value === "#") {
        return sum + Number(index);
      }

      return sum;
    }, 0);
  };

  for (let gen = 0; gen < generations; gen++) {
    let newPots = {};

    Object.keys(pots).forEach(key => {
      for (let index = Number(key) - 4; index < Number(key) + 4; index++) {
        const row = getRowFor(Number(index));
        if (patterns[row]) {
          newPots[index] = "#";
        }
      }
    });

    pots = newPots;

    let sum = getSum(pots);
    let diff = sum / previousSum;
    previousSum = sum;
    if (Math.abs(diff - previousDiff) < 1e-5) {
      sameDiffCount++;
    } else {
      sameDiffCount = 0;
    }

    previousDiff = diff;

    if (sameDiffCount === 3) {
      console.log(sum + Math.floor(sum * diff - sum) * (generations - gen - 1));
      break;
    }
  }
})();
