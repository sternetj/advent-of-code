import { parseInput } from "../../util/parse-input";

const map = parseInput((l) => l.split("").map(Number));

const getTrailTerminators = (x: number, y: number) => {
  const current = map[y][x];

  if (current === 9) return new Set([`${x},${y}`]);

  let total = new Set<string>();
  const coords = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  for (const [dx, dy] of coords) {
    if (map[dy]?.[dx] === current + 1) {
      total = new Set([...total, ...getTrailTerminators(dx, dy)]);
    }
  }
  return total;
};

const totalTrails = map.reduce((total, row, y) => {
  return (
    total +
    row.reduce((total, cell, x) => {
      if (cell === 0) {
        return total + getTrailTerminators(x, y).size;
      }
      return total;
    }, 0)
  );
}, 0);

console.log(totalTrails);
