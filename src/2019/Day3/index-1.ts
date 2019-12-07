import { parseInput } from "../../util/parse-input";
import { flatten } from "lodash";

const [wireA, wireB] = parseInput(
  row => {
    let x = 0;
    let y = 0;
    return [{ x, y }].concat(
      row.split(",").map(v => {
        const dir = v[0];
        const dist = +v.slice(1);
        if (dir === "U" || dir === "D") {
          y += (dir === "U" ? -1 : 1) * dist;
        } else {
          x += (dir === "L" ? -1 : 1) * dist;
        }
        return { x, y };
      })
    );
  },
  __dirname,
  "input.txt"
);

function segmentsToCoords(a, b): { x: number; y: number }[] {
  let coords = [];
  let minX = Math.min(a.x, b.x);
  let maxX = Math.max(a.x, b.x);
  for (let dx = minX; dx <= maxX; dx++) {
    coords.push({ x: dx, y: a.y });
  }

  let minY = Math.min(a.y, b.y);
  let maxY = Math.max(a.y, b.y);
  for (let dy = minY; dy <= maxY; dy++) {
    coords.push({ x: a.x, y: dy });
  }

  return coords;
}

const aCoords = flatten(
  wireA.slice(1).map((v, i) => segmentsToCoords(wireA[i], v))
);
const bCoords = {};
wireB.slice(1).map((v, i) => {
  segmentsToCoords(wireB[i], v).forEach(({ x, y }) => {
    bCoords[`${x},${y}`] = true;
  });
});

const minDist = aCoords
  .filter(({ x, y }) => bCoords[`${x},${y}`] && x != 0 && y != 0)
  .reduce(
    (minDist, { x, y }) => Math.min(minDist, Math.abs(x) + Math.abs(y)),
    Infinity
  );

console.log(minDist);
