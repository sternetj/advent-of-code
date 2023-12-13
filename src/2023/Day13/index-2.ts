import { parseInputWithBreaks } from "../../util/parse-input";

let mapId = 0;
const input = parseInputWithBreaks(
  (line) => {
    if (line === ("" as const)) {
      mapId++;
      return line;
    }
    return { line, mapId };
  },
  __dirname,
  process.env.INPUT
);

let maps: Record<number, string[]> = {};

input.forEach(({ line, mapId }) => {
  maps[mapId] ||= [];
  maps[mapId].push(line);
});

const findReflectionPoint = (map: string[], returnStart: boolean) => {
  for (let index = 0; index < map.length - 1; index++) {
    let start = index;
    let end = map.length - 1;

    while (start < end && map[start++] === map[end--]) {
      if (start - end === 1) return returnStart ? start : map.length - end - 1;
    }
  }

  return -1;
};

function rotate(matrix: string[]) {
  return matrix[0].split("").map((_, i) =>
    matrix
      .map((row) => row[i])
      .reverse()
      .join("")
  );
}

const subStr = (s: string, index: number, v: string) =>
  [s.slice(0, index), v, s.slice(index + 1)].join("");

const original = Object.values(maps).map((map) => {
  let workingMap = map.slice();
  let i = 0;

  for (const multiplier of [100, 1, 100, 1]) {
    const res = findReflectionPoint(workingMap, i < 2);

    if (res !== -1) {
      return res * multiplier;
    }
    workingMap = rotate(workingMap);
    i++;
  }
}, 0);

const result = Object.values(maps).reduce((total, map, v) => {
  let workingMap = map.slice();
  let i = 0;

  for (const multiplier of [100, 1, 100, 1]) {
    for (let c = 0; c < workingMap[0].length; c++) {
      for (let r = 0; r < workingMap.length; r++) {
        const smudgeFreeMap = workingMap.slice();
        smudgeFreeMap[r] = subStr(
          smudgeFreeMap[r],
          c,
          smudgeFreeMap[r][c] === "." ? "#" : "."
        );

        const res = findReflectionPoint(smudgeFreeMap, i < 2);

        if (res !== -1 && res * multiplier !== original[v]) {
          return total + res * multiplier;
        }
      }
    }
    workingMap = rotate(workingMap);
    i++;
  }
  return total;
}, 0);

console.log(result);

// correct: 44615
