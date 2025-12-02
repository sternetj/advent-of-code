import { parseString } from "../../util/parse-input";

const input = parseString()
  .trim()
  .split(",")
  .map((r) => r.split("-").map(Number) as [number, number]);

const result = input.reduce((total, [min, max]) => {
  for (let i = min; i <= max; i++) {
    const v = `${i}`;
    if (v.length % 2 !== 0) continue;
    const a = v.slice(0, v.length / 2);
    const b = v.slice(v.length / 2);
    if (a === b) total += i;
  }

  return total;
}, 0);

console.log(result);
