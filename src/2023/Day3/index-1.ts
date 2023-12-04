import { parseInput } from "../../util/parse-input";
import { find } from "lodash";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

const isAdjacentToSymbol = (r: number, c: number) => {
  return !!(
    input[r - 1]?.[c - 1]?.match(/[^0-9.]/) ||
    input[r]?.[c - 1]?.match(/[^0-9.]/) ||
    input[r + 1]?.[c - 1]?.match(/[^0-9.]/) ||
    input[r - 1]?.[c]?.match(/[^0-9.]/) ||
    input[r + 1]?.[c]?.match(/[^0-9.]/) ||
    input[r - 1]?.[c + 1]?.match(/[^0-9.]/) ||
    input[r]?.[c + 1]?.match(/[^0-9.]/) ||
    input[r + 1]?.[c + 1]?.match(/[^0-9.]/)
  );
};

const parts = [];

let shouldAdd = false;
let currentNum = "";
for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[0].length; c++) {
    if (input[r][c].match(/[0-9]/)) {
      currentNum += input[r][c];
      shouldAdd ||= isAdjacentToSymbol(r, c);
    } else {
      if (shouldAdd) {
        parts.push(+currentNum);
      }

      shouldAdd = false;
      currentNum = "";
    }
  }
}

console.log(parts.reduce((t, v) => t + v, 0));
