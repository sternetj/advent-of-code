import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

const preambleSize = 25;
const buffer = input.slice(0, preambleSize);
input.splice(0, preambleSize);

let next: number, isValid: boolean;

do {
  next = input.shift();
  isValid = buffer.some((v1, i, arr) =>
    arr.slice(i + 1).some((v2) => v1 + v2 === next),
  );

  buffer.shift();
  buffer.push(next);
} while (isValid);

console.log(next);
