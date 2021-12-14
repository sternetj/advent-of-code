import { parseInput } from "../../util/parse-input";
import { countBy } from "lodash";

const input = parseInput(
  (l) => {
    if (l.includes("->")) {
      const [_, from, to] = l.match(/(.*) -> (.*)/);
      return [from, to];
    } else {
      return l.split("");
    }
  },
  __dirname,
  "input.txt"
);

let start = input[0];
const rules = input.slice(1).reduce(
  (map, [from, to]) => ({
    ...map,
    [from]: to,
  }),
  {} as Record<string, string>
);

const buildChain = (p: string, maxDepth = 10, depth = 0): string => {
  if (p.length <= 1) return p;
  if (depth >= maxDepth) return "";
  const pair = p.slice(0, 2);
  const insert = rules[pair];
  const [a, b] = pair;
  return (
    (depth === 0 ? a : "") +
    buildChain(a + insert, maxDepth, depth + 1) +
    insert +
    buildChain(insert + b, maxDepth, depth + 1) +
    (depth === 0 ? buildChain(p.slice(1), maxDepth, depth) : "")
  );
};

let polymer = buildChain(start.join(""), 10);

const counts = countBy(polymer.split(""));
const max = Math.max(...Object.values(counts));
const min = Math.min(...Object.values(counts));

console.log(max - min);
