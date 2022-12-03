import { intersection } from "lodash";
import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, process.env.INPUT);

const toPriority = (s: string) => {
  const code = s.charCodeAt(0);
  if (s.toUpperCase() === s) {
    return code - 38;
  }

  return code - 96;
};

const prioritySum = input.reduce((total, items) => {
  const a = items.slice(0, items.length / 2);
  const b = items.slice(-items.length / 2);
  const [sharedItem] = intersection(a, b);
  return total + toPriority(sharedItem);
}, 0);

console.log(prioritySum);
