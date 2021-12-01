import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

console.log(input.filter((v, i, a) => v > a[i - 1]).length);
