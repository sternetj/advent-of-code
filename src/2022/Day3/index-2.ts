import { intersection, chunk } from "lodash";
import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, process.env.INPUT);

const toPriority = (s: string) => {
  const code = s.charCodeAt(0);
  if (s.toUpperCase() === s) {
    return code - 38;
  }

  return code - 96;
};

const prioritySum = chunk(input, 3).reduce((total, bags) => {
  const [badge] = intersection(...bags);
  return total + toPriority(badge);
}, 0);

console.log(prioritySum);
