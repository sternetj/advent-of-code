import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

const result = input.map(v => Math.floor(v / 3 - 2)).reduce((a, b) => a + b, 0);

console.log(result);
