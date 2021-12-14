import { parseInput } from "../../util/parse-input";
import { memoize } from "lodash";

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

const mergeCounts = (counts: Record<string, number>[]) => {
  return counts.reduce((totals, count) => {
    Object.entries(count).forEach(([k, val]) => {
      totals[k] = (totals[k] ?? 0) + val;
    });

    return totals;
  }, {} as Record<string, number>);
};

const buildChain = memoize(
  (p: string, maxDepth = 10, depth = 0): Record<string, number> => {
    if (p.length < 0) return {};
    if (p.length == 1) return { [p]: 1 };
    if (depth >= maxDepth) return {};
    const pair = p.slice(0, 2);
    const insert = rules[pair];
    const [a, b] = pair;

    const toMerge = [
      { [insert]: 1 },
      buildChain(a + insert, maxDepth, depth + 1),
      buildChain(insert + b, maxDepth, depth + 1),
    ];

    if (depth === 0) {
      toMerge.push({ [a]: 1 });
      toMerge.push(buildChain(p.slice(1), maxDepth, depth));
    }

    return mergeCounts(toMerge);
  },
  (p, md = 10, d = 0) => `${p}-${md}-${d}`
);

const counts = buildChain(start.join(""), 40);

const max = Math.max(...Object.values(counts));
const min = Math.min(...Object.values(counts));

console.log(max - min);
