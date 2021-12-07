import { parseInput } from "../../util/parse-input";
import { head, last as lastEl, sum } from "lodash";

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
let plane = new Array(last - min).fill([]);
plane[first - min] = input.filter((v) => v === first);
plane[last - min] = input.filter((v) => v === last);
let fuel = 0;

while (first !== last) {
  const fCost = sum(plane[first].map((v) => first - v + 1));
  const lCost = sum(plane[last].map((v) => v - last + 1));

  if (fCost <= lCost) {
    fuel += fCost;
    first++;
    plane[first - min] = plane[first - 1 - min].concat(
      input.filter((v) => v === first)
    );
  } else {
    fuel += lCost;
    last--;
    plane[last - min] = plane[last + 1 - min].concat(
      input.filter((v) => v === last)
    );
  }
}

console.log(fuel);
