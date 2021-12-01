import { parseInput } from "../../util/parse-input";
import { sum } from "lodash";

const input = parseInput(Number, __dirname, "input.txt");

console.log(
  input.filter((_, i, a) => sum(a.slice(i + 1, i + 4)) > sum(a.slice(i, i + 3)))
    .length
);
