import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""));

const start = input.reduce(
  (s, row, y) => {
    if (s[0] > 0) return s;
    const x = row.indexOf("S");
    if (x > -1) return [x, y];
    return s;
  },
  [0, 0],
) as [number, number];

const end = input.reduce(
  (s, row, y) => {
    if (s[0] > 0) return s;
    const x = row.indexOf("E");
    if (x > -1) return [x, y];
    return s;
  },
  [0, 0],
) as [number, number];

const key = ([x, y]: [number, number]) => `${x},${y}`;

const aStar = (start: [number, number], end: [number, number]) => {
  const toProcess: [[number, number], [number, number]][] = [[start, [1, 0]]];
  const cameFrom = {};
  const gScore = { [key(start)]: 0 };

  while (toProcess.length) {
    let current = toProcess.reduce((minI, p) => {
      if (gScore[key(p[0])] < gScore[key(minI[0])]) return p;
      return minI;
    }, toProcess[0]);

    if (current[0][0] === end[0] && current[0][1] === end[1]) {
      const path = [current];
      while (cameFrom[key(current[0])]) {
        path.unshift(cameFrom[key(current[0])]);
        current = cameFrom[key(current[0])];
      }
      return path;
    }

    toProcess.splice(toProcess.indexOf(current), 1);

    for (const [dx, dy] of [
      current[1],
      [-current[1][1], -current[1][0]],
      [current[1][1], current[1][0]],
    ]) {
      const next: [number, number] = [current[0][0] + dx, current[0][1] + dy];
      if (!["S", ".", "E"].includes(input[next[1]]?.[next[0]])) continue;
      const newGScore =
        gScore[key(current[0])] +
        (current[1][0] === dx && current[1][1] === dy ? 1 : 1001);
      if (newGScore < (gScore[key(next)] ?? Infinity)) {
        cameFrom[key(next)] = current;
        gScore[key(next)] = newGScore;
        toProcess.push([next, [dx, dy]]);
      }
    }
  }

  return [];
};

const path = aStar(start, end);
let dx = 1,
  dy = 0;

const score = path.reduce((s, [_, d]) => {
  const isTurn = d[0] !== dx || d[1] !== dy;
  dx = d[0];
  dy = d[1];

  return s + (isTurn ? 1001 : 1);
}, -1);

console.log(score);
