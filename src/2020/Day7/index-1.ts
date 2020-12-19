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

let toSearch = ["shiny gold"];
let ways = {};

while (toSearch.length) {
  const matches = Object.entries(map)
    .filter(([k, bags]) => bags.some(({ type }) => toSearch.includes(type)))
    .map(([k]) => k);
  toSearch = matches.filter((m) => !ways[m]);
  matches.forEach((m) => (ways[m] = true));
}

console.log(Object.keys(ways).length);
