import { flatten, uniq } from "lodash";
import { parseInput } from "../../util/parse-input";

let steps = parseInput(
  v => {
    const [_, first, second] = v.match(
      /Step (.) must be finished before step (.) can begin./
    );
    return [first, second];
  },
  __dirname,
  "input.txt"
);

const requirements: { [key: string]: Set<string> } = {};

steps.forEach(([required, step]) => {
  requirements[step] = requirements[step] || new Set();
  requirements[step].add(required);
});

let buildOrder = "";
let todo = uniq(flatten(steps)).sort();

while (todo.length) {
  for (let step of todo) {
    if (!requirements[step] || requirements[step].size === 0) {
      buildOrder += step;
      todo = todo.filter(s => s !== step);
      Object.values(requirements).forEach(set => set.delete(step));
      break;
    }
  }
}

console.log(buildOrder);
