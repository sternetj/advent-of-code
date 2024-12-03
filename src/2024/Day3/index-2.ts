import { parseString } from "../../util/parse-input";

const input = parseString()
  .replace(/\n/g, "")
  .matchAll(/((do)(n't)?\(\)|(mul)\((\d{1,3}),(\d{1,3})\))/g);

let total = 0;
let disabled = false;
for (const match of input) {
  const [instruction] = match;
  if (instruction === "do()" && disabled) {
    disabled = false;
  } else if (instruction === "don't()" && !disabled) {
    disabled = true;
  } else if (match[4] === "mul" && !disabled) {
    const [a, b] = match.slice(5);
    total += Number(a) * Number(b);
  }
}
console.log(total);
