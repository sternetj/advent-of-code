import { parseInput } from "../../util/parse-input";
import { computeIntCode } from "../int-code";

const input = parseInput(Number, __dirname, "input.txt");

console.log(computeIntCode(input, 1));
