import { parseInput } from "../../util/parse-input";

let farm = parseInput((l) => l.split(""));

const areas: Record<string, number> = {};
const outline: Record<string, [number, number, string][]> = {};
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
  outline[cropLabel] ??= [];
  outline[cropLabel].push(
    ...sides.map(([ny, nx]) => [nx, ny, cropLabel] as [number, number, string]),
  );

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

const calculateNumSides = (outline: [number, number, string][]) => {
  let sides = 0;
  let toProcess = [outline.pop()];
  const visited: Record<string, boolean> = {};
  console.log(toProcess[0][2]);
  while (toProcess.length) {
    const [x, y, label] = toProcess.pop();
    console.log(x, y, sides);
    sides++;
    visited[key([x, y])] = true;

    const corners = outline.filter(
      ([nx, ny, nlabel]) =>
        !visited[key([nx, ny])] &&
        nlabel === label &&
        ((nx === x + 1 && ny === y + 1) ||
          (nx === x - 1 && ny === y - 1) ||
          (nx === x + 1 && ny === y - 1) ||
          (nx === x - 1 && ny === y + 1)),
    );

    const neighbors = outline.filter(
      ([nx, ny, nlabel]) =>
        !visited[key([nx, ny])] &&
        nlabel === label &&
        ((nx === x + 1 && ny === y) ||
          (nx === x - 1 && ny === y) ||
          (nx === x && ny === y + 1) ||
          (nx === x && ny === y - 1)),
    );

    if (neighbors[0]) {
      sides--;
      toProcess.push(neighbors[0]);
    }

    if (corners.length) {
      if (neighbors[0]) {
        toProcess.push(...corners);
      } else {
        toProcess.push(corners[0]);
      }
      continue;
    }
  }

  return sides;
};

console.log(outline);
console.log(
  Object.keys(areas).reduce((total, label) => {
    const sides = calculateNumSides(outline[label]);
    console.log(label, sides, areas[label]);
    return total + areas[label] * sides;
  }, 0),
);
