import { parseString } from "../../util/parse-input";

const input = parseString()
  .trim()
  .split(",")
  .map((r) => r.split("-").map(Number) as [number, number]);

const result = input.reduce((total, [min, max]) => {
  for (let i = min; i <= max; i++) {
    const v = `${i}`;
    for (let j = 1; j <= v.length / 2; j++) {
      let matches = true;
      const pattern = v.slice(0, j);
      for (let k = j; k < v.length; k += j) {
        const compare = v.slice(k, k + j);
        if (compare != pattern) {
          matches = false;
          break;
        }
      }
      if (matches) {
        total += i;
        break;
      }
    }
  }

  return total;
}, 0);

console.log(result);
