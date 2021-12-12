import { parseInput } from "../../util/parse-input";
import { sum } from "lodash";

const input = parseInput((l) => l.split("-"), __dirname, "input.txt").reduce(
  (map, [a, b]) => ({
    ...map,
    [a]: (map[a] ?? []).concat(b),
    [b]: (map[b] ?? []).concat(a),
  }),
  {} as Record<string, string[]>,
);

const isLower = (s: string) => s.match(/^[a-z]+$/);

const calcNumPaths = (space = "start", visited = {}) => {
  if (space === "end") return 1;

  if (isLower(space)) {
    visited[space] = true;
  }

  return sum(
    input[space]
      .filter((s) => !visited[s])
      .map((s) => calcNumPaths(s, { ...visited })),
  );
};

console.log(calcNumPaths());
