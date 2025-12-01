import { parseInput } from "../../util/parse-input";

let farm = parseInput((l) => l.split(""));

const areas: Record<string, number> = {};
const perimeters: Record<string, number> = {};
const visited: Record<string, boolean> = {};
const fenceIndices: Record<string, number> = {};

const key = ([x, y]: [number, number]) => `${x},${y}`;

const getDimensions = (label: string, index: number, x: number, y: number) => {
  const cropLabel = `${label}-${index}`;
  const visitKey = key([x, y]);
  if (visited[visitKey]) return;
  visited[visitKey] = true;
  areas[cropLabel] ??= 0;
  areas[cropLabel]++;

  const neighbors: [number, number][] = [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ];

  const sides = neighbors.filter(([ny, nx]) => farm[ny]?.[nx] !== label);
  perimeters[cropLabel] ??= 0;
  perimeters[cropLabel] += sides.length;

  neighbors
    .filter((v) => farm[v[0]]?.[v[1]] === label)
    .forEach(([ny, nx]) => getDimensions(farm[ny][nx], index, nx, ny));
};

for (let y = 0; y < farm.length; y++) {
  for (let x = 0; x < farm[y].length; x++) {
    const label = farm[y][x];

    if (!visited[key([x, y])]) {
      fenceIndices[label] ??= 0;
      getDimensions(label, fenceIndices[label]++, x, y);
    }
  }
}

console.log(
  Object.keys(areas).reduce(
    (total, label) => total + areas[label] * perimeters[label],
    0,
  ),
);
