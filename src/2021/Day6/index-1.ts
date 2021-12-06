import { parseInput } from "../../util/parse-input";
import { sum, memoize } from "lodash";

const [input] = parseInput(
  (l) => l.split(",").map(Number),
  __dirname,
  "input.txt",
);

const calculateSchoolSize = memoize(
  (bornOn: number, maxDays = 80) => {
    if (bornOn > maxDays) return 0;

    let children = [];

    let childOn = bornOn + 9; // Child is born day after 8 day waiting period
    while (childOn <= maxDays) {
      children.push(childOn);
      childOn += 7; // Child is born day after 6 day waiting period
    }

    return sum([
      1, // Count initial fish existence
      ...children.map((grandChildOn) =>
        calculateSchoolSize(grandChildOn, maxDays),
      ),
    ]);
  },
  (a, b) => `${a}-${b}`,
);

console.log("80:", sum(input.map((v) => calculateSchoolSize(v - 8, 80))));
console.log("256:", sum(input.map((v) => calculateSchoolSize(v - 8, 256))));
