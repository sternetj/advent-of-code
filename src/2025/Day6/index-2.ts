import { parseString } from "../../util/parse-input";

const input = parseString()
  .split("\n")
  .filter((v) => !!v.trim())
  .map((l) => l.split("").reverse());

let total = 0;
let operands = [];
for (let col = 0; col <= input[0].length; col++) {
  const op = input.at(-1).findLast((v, oi) => v.trim() && oi < col);
  let subTotal = 0;
  let num = "";

  for (let row = 0; row < input.length - 1; row++) {
    num += input[row][col]?.trim() ?? "";
  }

  if (num) {
    operands.push(num);
  } else {
    if (op === "*") {
      subTotal = operands.reduce((acc, v) => acc * Number(v), 1);
    } else {
      subTotal = operands.reduce((acc, v) => acc + Number(v), 0);
    }
    operands = [];
  }

  total += subTotal;
}

console.log(total);
