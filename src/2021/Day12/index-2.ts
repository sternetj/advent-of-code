import { parseInput } from "../../util/parse-input";
import { uniq } from "lodash";

const input = parseInput((l) => l.split("-"), __dirname, "input.txt").reduce(
  (map, [a, b]) => ({
    ...map,
    [a]: (map[a] ?? []).concat(b),
    [b]: (map[b] ?? []).concat(a),
  }),
  {} as Record<string, string[]>,
);

const isLower = (s: string) => s.match(/^[a-z]+$/);

const canRevisit = (canVisitTwice: string, s: string) =>
  !canVisitTwice && s !== "start" && s !== "end" && isLower(s);

const calcNumPaths = (
  canVisitTwice?: string,
  space = "start",
  visited = {},
) => {
  if (space === "end") return [["end"]];

  if (isLower(space)) {
    visited[space] = (visited[space] ?? 0) + 1;
  }

  return input[space]
    .filter((s) => (visited[s] ?? 0) < (canVisitTwice === s ? 2 : 1))
    .map((s) => {
      let a = [];
      if (canRevisit(canVisitTwice, s)) {
        const paths = calcNumPaths(s, s, { ...visited });
        paths.forEach((path) => {
          a.push([space].concat(...path));
        });
      }

      const paths = calcNumPaths(canVisitTwice, s, { ...visited });
      paths.forEach((path) => {
        a.push([space].concat(...path));
      });

      return a;
    })
    .flat();
};

const result = calcNumPaths().map((p) => p.join(","));

// console.log(result.length);
console.log(uniq(result).length);
