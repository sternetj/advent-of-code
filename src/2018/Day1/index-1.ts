import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, 'input-1.txt');

console.log(input.reduce((total, value) => total + value, 0));