import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v): [string, string] => {
    return v.split(")").map(v => v.trim()) as any;
  },
  __dirname,
  "input.txt",
);

export const map: { [k: string]: string[] } = {};
input.forEach(([a, goesTo]) => {
  map[a] = map[a] || [];

  map[a].push(goesTo);
});
