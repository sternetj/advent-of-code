import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.match(/^(.) (\d+) \((.*)\)$/).slice(1, 4),
  __dirname,
  process.env.INPUT
);

let x = 0,
  y = 0,
  visited = [{ x, y }];

input.forEach(([dir, numStr]) => {
  const num = Number(numStr);
  const inc = ["U", "L"].includes(dir) ? -1 : 1;
  const finalX = ["R", "L"].includes(dir) ? x : x + inc * num;
  const finalY = ["U", "D"].includes(dir) ? y : y + inc * num;

  x = finalX;
  y = finalY;

  visited.push({ x, y });
});

visited.push(visited[0]);

const res =
  1 + // I don't know why this is needed
  visited.reduce((t, p1, i, arr) => {
    if (i === arr.length - 1) return t;

    const p2 = arr[i + 1];

    return (
      t +
      p1.y * p2.x -
      p1.x * p2.y +
      (p1.y - p2.y + (p2.x - p2.x)) +
      Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))
    );
  }, 0) /
    2;

console.log(res);
