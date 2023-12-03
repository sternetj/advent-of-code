import { memoize } from "lodash";
import { parseInput } from "../../util/parse-input";

const argsJoin = (...args) => args.join("|");
const abs = memoize((a, b) => Math.abs(a - b), argsJoin);
const add = memoize((a, b, c, d) => abs(a, b) + abs(c, d), argsJoin);
const mDist = ({ x, y }, { x: x2, y: y2 }) => add(x, x2, y, y2);
const sensors = parseInput(
  (line) => {
    const [x, y, bx, by] = line
      .match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
      )
      .slice(1)
      .map(Number);
    const r = mDist({ x, y }, { x: bx, y: by });
    return {
      x,
      y,
      bx,
      by,
      r,
    };
  },
  __dirname,
  process.env.INPUT
);

const maxCoord = process.env.INPUT.includes("test.txt") ? 20 : 4000000;
const map = {};
for (let x = maxCoord; x >= 0; x--) {
  for (let y = maxCoord; y >= 0; y--) {
    map[`${x},${y}`] = true;
  }
}

console.log("Here");
// sensors.forEach(({ x, y, r }, i) => {
//   console.log(`Sensors remaining ${sensors.length - i}`);
//   let xStart = Math.max(x - r, 0);
//   let xEnd = Math.min(x + r, maxCoord);

//   for (let xp = xStart; xp <= xEnd; xp++) {
//     const yRange = r - Math.abs(xp - x);
//     let yStart = Math.max(y - yRange, 0);
//     let yEnd = Math.min(y + yRange, maxCoord);
//     for (let yp = yStart; yp <= yEnd; yp++) {
//       delete map[`${xp},${yp}`];
//     }
//   }
// });

console.log(map);
// console.log(`${x},${y}`);
// console.log(x * 4000000 + y);
