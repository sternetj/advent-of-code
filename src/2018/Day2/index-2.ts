import { parseInput } from "../../util/parse-input";
import { compact } from "lodash";

const input = compact(parseInput(v => `${v}`, __dirname, "input-1.txt"));

for (let aIndex = 0; aIndex < input.length; aIndex++) {
  const compare = input.slice(aIndex + 1);

  for (let bIndex = 0; bIndex < compare.length; bIndex++) {
    const a = input[aIndex];
    const b = compare[bIndex];

    if (a.length != b.length) continue;

    let mismatched = 0;
    let charIndex = 0;

    while (mismatched < 2 && charIndex < a.length) {
      mismatched += a[charIndex] === b[charIndex] ? 0 : 1;
      charIndex++;
    }

    if (mismatched === 1) {
      console.log(a);
      console.log(b);
      process.exit(0);
    }
  }
}
