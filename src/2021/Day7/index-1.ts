import { parseInput } from "../../util/parse-input";
import { head, last as lastEl } from "lodash";

const [input] = parseInput(
  (l) =>
    l
      .split(",")
      .map(Number)
      .sort((a, b) => a - b),
  __dirname,
  "input.txt"
);

let first = head(input);
const min = first;
let last = lastEl(input);
let plane = new Array(last - min).fill(0);
plane[first - min] = input.filter((v) => v === first).length;
plane[last - min] = input.filter((v) => v === last).length;
let fuel = 0;

while (first !== last) {
  const fCost = plane[first];
  const lCost = plane[last];

  if (fCost <= lCost) {
    fuel += fCost;
    first++;
    plane[first - min] =
      plane[first - 1 - min] + input.filter((v) => v === first).length;
  } else {
    fuel += lCost;
    last--;
    plane[last - min] =
      plane[last + 1 - min] + input.filter((v) => v === last).length;
  }
}

console.log(fuel);
