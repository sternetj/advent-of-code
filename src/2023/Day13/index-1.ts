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

const result = Object.values(maps).reduce((total, map, v) => {
  let workingMap = map.slice();
  let i = 0;
  for (const multiplier of [100, 1, 100, 1]) {
    const res = findReflectionPoint(workingMap, i < 2);
    if (res !== -1) {
      return total + res * multiplier;
    }
    workingMap = rotate(workingMap);
    i++;
  }
  return total;
}, 0);

console.log(result);
