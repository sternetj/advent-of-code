import { parseInput } from "../../util/parse-input";

const moves = parseInput(
  (v) => {
    const [dir, dist] = v.split(" ");
    return [dir, +dist] as [string, number];
  },
  __dirname,
  process.env.INPUT
);

let hx = 0,
  hy = 0,
  tx = 0,
  ty = 0;

const visited = {};
for (const [dir, dist] of moves) {
  for (let step = 0; step < dist; step++) {
    let moveY = 0,
      moveX = 0;
    if (["U", "D"].includes(dir)) {
      moveY = dir == "U" ? 1 : -1;
      hy += moveY;
    } else {
      moveX = dir == "L" ? -1 : 1;
      hx += moveX;
    }

    const xDiff = Math.abs(hx - tx);
    const yDiff = Math.abs(hy - ty);

    const isDiagonal = xDiff + yDiff > 2;

    if (xDiff + yDiff > 1 && (xDiff !== 1 || yDiff !== 1)) {
      tx += moveX || isDiagonal ? (hx > tx ? 1 : -1) : 0;
      ty += moveY || isDiagonal ? (hy > ty ? 1 : -1) : 0;
    }

    visited[`${tx},${ty}`] = true;
  }
}

console.log(Object.keys(visited).length);
