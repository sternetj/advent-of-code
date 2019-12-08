import { parseInput } from "../../util/parse-input";
import { computeIntCode } from "../int-code";

const input = parseInput(Number, __dirname, "input.txt");

input[1] = 12;
input[2] = 2;

console.log(computeIntCode(input));
