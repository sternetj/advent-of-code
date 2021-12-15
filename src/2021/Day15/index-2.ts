import { parseInput } from "../../util/parse-input";

let input = parseInput((l) => l.split("").map(Number), __dirname, "input.txt");

const key = (x: number, y: number) => `${x},${y}`;

input = new Array(input.length * 5).fill(0).map((_, y) =>
  new Array(input[0].length * 5).fill(0).map((_, x) => {
    const yScaled = y % input.length;
    const xScaled = x % input[0].length;
    const yFactor = Math.floor(y / input.length);
    const xFactor = Math.floor(x / input[0].length);
    const val = input[yScaled][xScaled] + yFactor + xFactor;

    return val % 9 || 9;
  })
);

const maxX = input[0].length - 1;
const maxY = input.length - 1;

const toProcess = [
  {
    x: 0,
    y: 0,
    total: 0,
  },
];
const visited = { [key(0, 0)]: true };

let minRiskLevel = 0;

do {
  const { x, y, total } = toProcess.sort((a, b) => a.total - b.total).shift();

  if (x === maxX && y === maxY) {
    minRiskLevel = total;
    break;
  }

  [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ].forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (input[ny]?.[nx] === undefined) return;
    if (visited[key(nx, ny)]) return;

    visited[key(nx, ny)] = true;
    toProcess.push({
      x: nx,
      y: ny,
      total: total + input[ny][nx],
    });
  });
} while (toProcess.length > 0);

console.log(minRiskLevel);
