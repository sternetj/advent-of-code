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

  const generations = 20;
  let board = input[0] as string;
  let patterns = input.slice(2) as Pattern[];
  let zeroIndex = 0;

  for (let gen = 0; gen < generations; gen++) {
    let indexOfFirstPlant = board.indexOf("#");
    if (indexOfFirstPlant < 4) {
      board = `${"....".slice(0, 4 - indexOfFirstPlant)}${board}....`;
      zeroIndex += 4 - indexOfFirstPlant;
    }
    if (board.slice(board.length - 4).indexOf("#") > -1) {
      board = `${board}....`;
    }

    let replacements: { index: number; value: string }[] = [];

    for (let pattern of patterns) {
      let start = 0;
      let foundAt = board.indexOf(pattern.matches);

      while (foundAt > -1) {
        replacements.push({
          index: foundAt + 2,
          value: pattern.replaceWith
        });

        start = foundAt + 1;
        foundAt = board.indexOf(pattern.matches, start);
      }
    }

    replacements.forEach(({ index, value }) => {
      board = board.slice(0, index) + value + board.slice(index + 1);
    });
  }

  const sum = board.split("").reduce((sum, value, index) => {
    if (value === "#") {
      return sum + index - zeroIndex;
    }

    return sum;
  }, 0);

  console.log(sum);
})();
