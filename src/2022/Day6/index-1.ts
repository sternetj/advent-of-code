import { uniq } from "lodash";
import { parseInput } from "../../util/parse-input";

const [input] = parseInput((v) => v.split(""), __dirname, process.env.INPUT);

let i;
const msgSize = 4;
for (i = msgSize; i < input.length; i++) {
  if (uniq(input.slice(i - msgSize, i)).length === msgSize) break;
}

console.log(i);
