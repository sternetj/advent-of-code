import { parseInput } from "../../util/parse-input";

const map = parseInput((l) => l.split(""));

const start = map.reduce((startPos, row, y) => {
  if (startPos?.length) return startPos;
  const x = row.indexOf("^");
  if (x !== -1) return [x, y];
}, [] as number[]);

const causesLoop = (x: number, y: number) => {
  const visited = {};
  const corners = {};
  const workingMap = JSON.parse(JSON.stringify(map));
  let pos = start.slice();
  let dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  workingMap[y][x] = "#";

  while (workingMap[pos[1]]?.[pos[0]]) {
    visited[pos.join(",")] = true;
    workingMap[pos[1]][pos[0]] = "X";
    const currentPos = pos.slice();
    pos[0] += dirs[0][0];
    pos[1] += dirs[0][1];
    if (workingMap[pos[1]]?.[pos[0]] === "#") {
      if (corners[`${pos.join(",")}-${dirs.join(",")}`]) return true;
      corners[`${pos.join(",")}-${dirs.join(",")}`] = true;
      dirs = [...dirs.slice(1), dirs[0]];
      pos = currentPos;
    }
  }

  return false;
};

let viableLoopCount = 0;
for (let oy = 0; oy < map.length; oy++) {
  for (let ox = 0; ox < map[0].length; ox++) {
    viableLoopCount += causesLoop(ox, oy) ? 1 : 0;
  }
}

console.log(viableLoopCount);
