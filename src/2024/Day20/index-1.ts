import { parseInput } from "../../util/parse-input";
import { aStar } from "../../util/a-star";

const map = parseInput((l) => l.split(""));

const end = map.reduce(
  (end, row, y) => {
    if (end[0] > -1) return end;
    const x = row.indexOf("E");
    return [x, y];
  },
  [-1, -1],
);

const start = map.reduce(
  (end, row, y) => {
    if (end[0] > -1) return end;
    const x = row.indexOf("S");
    return [x, y];
  },
  [-1, -1],
);

map[start[1]][start[0]] = ".";
map[end[1]][end[0]] = ".";

const getDistantToEnd = (start: number[]) =>
  aStar({
    start,
    end,
    map,
    isValidSpace: (space) => space === ".",
    heuristic: ([x, y]) => Math.abs(x - end[0]) + Math.abs(y - end[1]),
  }).length;

const cheats: Record<number, number> = {};
const bestDistance = getDistantToEnd(start);
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    const dividesSpace =
      (map[y - 1]?.[x] === "." && map[y + 1]?.[x] === ".") ||
      (map[y]?.[x - 1] === "." && map[y]?.[x + 1] === ".");
    if (map[y]?.[x] !== "#" || !dividesSpace) continue;

    map[y][x] = ".";
    const nextDistance = getDistantToEnd(start);
    map[y][x] = "#";

    const diff = bestDistance - nextDistance;
    if (diff > 0) {
      cheats[diff] ??= 0;
      cheats[diff]++;
    }
  }
}

console.log(
  Object.entries(cheats).reduce((total, [key, value]) => {
    if (Number(key) < 100) return total;
    return total + value;
  }, 0),
);
