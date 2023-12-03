import { parseInput } from "../../util/parse-input";

const mDist = ({ x, y }, { x: x2, y: y2 }) =>
  Math.abs(x - x2) + Math.abs(y - y2);
const sensors = parseInput(
  (line) => {
    const [x, y, bx, by] = line
      .match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
      )
      .slice(1)
      .map(Number);
    const range = mDist({ x, y }, { x: bx, y: by });
    return {
      x,
      y,
      bx,
      by,
      range,
      minX: x - range,
      maxX: x + range,
      minY: y - range,
      maxY: y + range,
    };
  },
  __dirname,
  process.env.INPUT
);

const y = process.env.INPUT.includes("test.txt") ? 10 : 2000000;

const sensorsInRange = sensors.filter(
  ({ minY, maxY }) => minY <= y && y <= maxY
);
const minX = Math.min(...sensorsInRange.map((s) => s.minX));
const maxX = Math.max(...sensorsInRange.map((s) => s.maxX));

let marked = 0;
for (let x = minX; x <= maxX; x++) {
  if (
    sensorsInRange.some(
      (s) =>
        mDist({ x: s.bx, y: s.by }, { x, y }) !== 0 &&
        mDist(s, { x, y }) <= s.range
    )
  ) {
    marked++;
  }
}

console.log(marked);
