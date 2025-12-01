import { parseInput } from "../../util/parse-input";
import { aStar } from "../../util/a-star";

const codes = parseInput((l) => l);

const numPad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["", "0", "A"],
];

const dPad = [
  ["", "^", "A"],
  ["<", "v", ">"],
];

const getIndexOfCode = (pad: string[][], value: string) => {
  const y = pad.findIndex((row) => row.includes(value));
  const x = pad[y].indexOf(value);
  return [x, y];
};

const pathTo = (
  map: string[][],
  startC: string,
  endC: string,
  depth: number,
) => {
  const start = getIndexOfCode(map, startC);
  const end = getIndexOfCode(map, endC);
  return aStar({
    start,
    end,
    map,
    isValidSpace: (space) => space !== "",
    heuristic: ([x, y], getPathSoFar) => {
      let changes = 0;
      let current = start;
      let currentDir = "";
      const path = getPathSoFar();
      for (const next of path) {
        const dir = diffToDir(current, next);
        if (currentDir && dir !== currentDir) {
          changes++;
        }
        current = next;
      }

      console.log({ x, y, path, changes });

      return Math.abs(x - end[0]) + Math.abs(y - end[1]) + changes * 1000;
    },
  });
};

const diffToDir = (a: number[], b: number[]) => {
  if (a[0] === b[0]) {
    if (a[1] > b[1]) return "^";
    return "v";
  }
  if (a[0] > b[0]) return "<";
  return ">";
};

const getCodeForCode = (pad: string[][], code: string[], depth: number) => {
  let padCurrent = "A";
  let padCurrentPos = getIndexOfCode(pad, padCurrent);

  let finalPath = "";
  while (code.length) {
    const next = code.shift();
    const path = pathTo(pad, padCurrent, next, depth);

    for (const pathPos of path.slice(1)) {
      finalPath += diffToDir(padCurrentPos, pathPos);
      padCurrent = pad[pathPos[1]][pathPos[0]];
      padCurrentPos = pathPos;
    }

    finalPath += "A";
  }

  return finalPath;
};

const result = codes.slice(0, 1).reduce((total, code) => {
  const r1 = getCodeForCode(numPad, code.split(""), 2);
  const r2 = getCodeForCode(dPad, r1.split(""), 1);
  const r3 = getCodeForCode(dPad, r2.split(""), 0);

  console.log({
    code,
    r1,
    r2,
    r3,
    calc: `${r3.length} * ${Number(code.slice(0, -1))}`,
  });

  return total + r3.length * Number(code.slice(0, -1));
}, 0);

console.log(result);
