import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    if (!v) return undefined;

    const matches = v
      .split(/bags?(?!\scontain\s|,\s|.)?/g)
      .map((s) =>
        s
          .replace("contain", "")
          .replace(".", "")
          .replace(",", "")
          .replace("no other", "")
          .trim(),
      )
      .filter((s) => !!s)
      .map((s) => {
        const [, ...matched] = s.match(/(\d*)\s?(.*)/);
        return matched;
      });
    return matches;
  },
  __dirname,
  "input.txt",
);

const map: { [k: string]: { count: number; type: string }[] } = input.reduce(
  (m, [[, container], ...bags]) => ({
    ...m,
    [container]: bags.map(([count, type]) => ({
      count: +count,
      type,
    })),
  }),
  {},
);

function calculateBags(forBag): number {
  const contains = map[forBag];

  const totalBags = contains.reduce((t, { count }) => t + count, 0);

  return (
    totalBags +
    contains.reduce((t, { count, type }) => t + count * calculateBags(type), 0)
  );
}

console.log(calculateBags("shiny gold"));
