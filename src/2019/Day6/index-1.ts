import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v): [string, string] => {
    return v.split(")").map(v => v.trim()) as any;
  },
  __dirname,
  "input.txt",
);

const map: { [k: string]: string[] } = {};
input.forEach(([a, goesTo]) => {
  map[a] = map[a] || [];

  map[a].push(goesTo);
});

const calcOrbits = (name: string, depth = 0) => {
  if (!map[name]) return depth;

  return depth + map[name].reduce((t, n) => t + calcOrbits(n, depth + 1), 0);
};

console.log(calcOrbits("COM"));
