import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, "input.txt");

const getNeighbors = (r: number, c: number, map: string[][]) => [
  (map[r - 1] || {})[c - 1],
  (map[r - 1] || {})[c],
  (map[r - 1] || {})[c + 1],
  map[r][c - 1],
  map[r][c + 1],
  (map[r + 1] || {})[c - 1],
  (map[r + 1] || {})[c],
  (map[r + 1] || {})[c + 1],
];

const computeNewSymbol = (r: number, c: number, map: string[][]) => {
  const seat = map[r][c];

  if (seat === "L") {
    const allNonOccupied = getNeighbors(r, c, map).every((s) => s !== "#");
    return allNonOccupied ? "#" : seat;
  }

  if (seat === "#") {
    const tooCrowded =
      getNeighbors(r, c, map).filter((s) => s === "#").length >= 4;
    return tooCrowded ? "L" : seat;
  }

  return seat;
};

const serializeMap = (map: string[][]) => map.map((r) => r.join("")).join("\n");

const stabilize = (map: string[][], previous = "") => {
  const newMap = map.map((row, r) =>
    row.map((col, c) => computeNewSymbol(r, c, map)),
  );

  const newSnapshot = serializeMap(newMap);
  if (newSnapshot === previous) {
    return newSnapshot;
  }

  return stabilize(newMap, newSnapshot);
};

console.log(
  stabilize(input)
    .split("")
    .filter((s) => s === "#").length,
);
