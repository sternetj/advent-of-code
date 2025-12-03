import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("").map(Number));

const result = input.reduce((total, line) => {
  let firstDigit = 0;
  let secondDigit = 0;
  for (let i = 0; i < line.length; i++) {
    const digit = line[i];
    if (digit > firstDigit && i + 1 !== line.length) {
      firstDigit = digit;
      secondDigit = 0;
    } else if (digit > secondDigit) {
      secondDigit = digit;
    }
  }
  return total + Number(`${firstDigit}${secondDigit}`);
}, 0);

console.log(result);
