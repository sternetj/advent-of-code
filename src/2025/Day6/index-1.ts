import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(/\s+/));

let total = 0;
for (let col = 0; col < input[0].length; col++) {
  const op = input[input.length - 1][col];
  let subTotal = op === "*" ? 1 : 0;
  for (let row = 0; row < input.length - 1; row++) {
    const num = Number(input[row][col]);
    if (op === "*") {
      subTotal *= num;
    } else {
      subTotal += num;
    }
  }

  total += subTotal;
}

console.log(total);
