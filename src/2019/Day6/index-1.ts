import { map } from "./puzzle-map";

const calcOrbits = (name: string, depth = 0) => {
  if (!map[name]) return depth;

  return depth + map[name].reduce((t, n) => t + calcOrbits(n, depth + 1), 0);
};

console.log(calcOrbits("COM"));
