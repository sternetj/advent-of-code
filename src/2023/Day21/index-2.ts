import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

let steps = process.env.INPUT.includes("test") ? 50 : 26501365;

const start = input.reduce<[number, number] | undefined>(
  (coords, row, rowIndex) => {
    if (coords) return coords;

    const colIndex = row.indexOf("S");

    if (colIndex > -1) return [rowIndex, colIndex];
  },
  undefined
);

const visited: Record<string, boolean> = {};

const key = (...nums: number[]) => nums.join("|");
const loop = (v: number, size: number) => ((v % size) + size) % size;

const toProcess = [{ pos: start, remaining: steps }];
let total = 0;

while (toProcess.length) {
  const { pos, remaining } = toProcess.pop();

  if (remaining === 0) continue;

  for (const dir of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const cR = pos[0] + dir[0];
    const cC = pos[1] + dir[1];
    const cell = input[loop(cR, input.length)]?.[loop(cC, input[0].length)];
    if (cell && cell !== "#" && !visited[key(cR, cC, remaining)]) {
      if (remaining === 1) {
        console.log(cR, cC);
        total += 1;
      } else {
        toProcess.push({ pos: [cR, cC], remaining: remaining - 1 });
      }

      visited[key(cR, cC, remaining)] = true;
    }
  }

  toProcess.sort((a, b) => {
    const aDist = Math.abs(a[0] - start[0]) + Math.abs(a[1] - start[1]);
    const bDist = Math.abs(b[0] - start[0]) + Math.abs(b[1] - start[1]);

    return bDist - aDist;
  });
}

console.log(total);
