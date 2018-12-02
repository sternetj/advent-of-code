import { parseInput } from "../../util/parse-input";
import { groupBy, uniq } from "lodash";

const input = parseInput(v => `${v}`, __dirname, "input-1.txt");

let twoCount = 0;
let threeCount = 0;

input.forEach(id => {
  let groups = groupBy(id.split(""));

  const matches = uniq(
    Object.keys(groups)
      .map(k => groups[k].length)
      .filter(v => v === 2 || v === 3),
  );

  if (matches.indexOf(2) > -1) {
    twoCount++;
  }

  if (matches.indexOf(3) > -1) {
    threeCount++;
  }
});

console.log(twoCount * threeCount);
