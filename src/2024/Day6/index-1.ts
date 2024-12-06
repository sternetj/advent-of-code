import { parseInput } from "../../util/parse-input";

const map = parseInput((l) => l.split(""));

let pos = map.reduce((startPos, row, y) => {
  if (startPos?.length) return startPos;
  const x = row.indexOf("^");
  if (x !== -1) return [x, y];
}, [] as number[]);

let dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const visited = {};

while (map[pos[1]]?.[pos[0]]) {
  visited[pos.join(",")] = true;
  map[pos[1]][pos[0]] = "X";
  const currentPos = pos.slice();
  pos[0] += dirs[0][0];
  pos[1] += dirs[0][1];
  if (map[pos[1]]?.[pos[0]] === "#") {
    dirs = [...dirs.slice(1), dirs[0]];
    pos = currentPos;
  }
}

console.log(Object.keys(visited).length);
