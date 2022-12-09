import { parseInput } from "../../util/parse-input";

const moves = parseInput(
  (v) => {
    const [dir, dist] = v.split(" ");
    return [dir, +dist] as [string, number];
  },
  __dirname,
  process.env.INPUT
);

let knots = new Array(10).fill(1).map(() => ({ x: 0, y: 0 }));

const visited = {};
for (const [dir, dist] of moves) {
  for (let step = 0; step < dist; step++) {
    if (["U", "D"].includes(dir)) {
      knots[0].y += dir == "U" ? 1 : -1;
    } else {
      knots[0].x += dir == "L" ? -1 : 1;
    }

    for (let i = 1; i < knots.length; i++) {
      const { x: hx, y: hy } = knots[i - 1];
      const { x: tx, y: ty } = knots[i];

      const xDiff = Math.abs(hx - tx);
      const yDiff = Math.abs(hy - ty);

      const isDiagonal = xDiff + yDiff > 2;

      if (xDiff + yDiff > 1 && (xDiff !== 1 || yDiff !== 1)) {
        let moveX = xDiff > 1 ? (hx > tx ? 1 : -1) : 0;
        let moveY = yDiff > 1 ? (hy > ty ? 1 : -1) : 0;
        knots[i].x += moveX || isDiagonal ? (hx > tx ? 1 : -1) : 0;
        knots[i].y += moveY || isDiagonal ? (hy > ty ? 1 : -1) : 0;
      }
    }

    const tail = knots[knots.length - 1];

    visited[`${tail.x},${tail.y}`] = true;
  }
}

console.log(Object.keys(visited).length);
