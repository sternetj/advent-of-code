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
          y += (dir === "U" ? 1 : -1) * dist;
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
  let coords = [a];
  let sign = a.x < b.x ? 1 : -1;
  if (a.x != b.x) {
    for (let dx = a.x; dx != b.x + sign; dx += sign) {
      coords.push({ x: dx, y: a.y });
    }
  }

  sign = a.y < b.y ? 1 : -1;
  if (a.y != b.y) {
    for (let dy = a.y; dy != b.y + sign; dy += sign) {
      coords.push({ x: a.x, y: dy });
    }
  }

  return coords;
}

function previousIsNotSame(a, b) {
  return a.x !== b.x || a.y !== b.y;
}

const aCoords = flatten(
  wireA.slice(1).map((v, i) => segmentsToCoords(wireA[i], v))
).filter((v, i, arr) => i == 0 || previousIsNotSame(v, arr[i - 1]));
const bCoordsObj = {};
const bCoords = flatten(
  wireB.slice(1).map((v, i) => segmentsToCoords(wireB[i], v))
).filter((v, i, arr) => i == 0 || previousIsNotSame(v, arr[i - 1]));
bCoords.forEach(({ x, y }) => {
  bCoordsObj[`${x},${y}`] = true;
});

const minSteps = aCoords
  .filter(({ x, y }) => bCoordsObj[`${x},${y}`] && x != 0 && y != 0)
  .reduce(
    (minSteps, { x, y }) =>
      Math.min(
        minSteps,
        aCoords.findIndex(v => v.x === x && v.y === y) +
          bCoords.findIndex(v => v.x === x && v.y === y)
      ),
    Infinity
  );

console.log(minSteps);
