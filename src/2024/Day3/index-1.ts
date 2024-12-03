import { parseString } from "../../util/parse-input";

const input = parseString()
  .replace(/\n/g, "")
  .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

let total = 0;
for (const [_, a, b] of input) {
  total += Number(a) * Number(b);
}
console.log(total);
