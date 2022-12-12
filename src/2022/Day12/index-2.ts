import { parseInput } from "../../util/parse-input";

type Node = {
  val: number;
  x: number;
  y: number;
  visited: string[];
};
let end: Node;
const starts: Node[] = [];

const map = parseInput(
  (row, ri) =>
    row.split("").map((v, ci) => {
      const val = v.charCodeAt(0);
      if (val === "S".charCodeAt(0)) {
        starts.push({ val: "a".charCodeAt(0), x: ci, y: ri, visited: [] });
        return "a".charCodeAt(0);
      } else if (val === "E".charCodeAt(0)) {
        end = { val: "z".charCodeAt(0), x: ci, y: ri, visited: [] };
        return "z".charCodeAt(0);
      } else if (val === "a".charCodeAt(0)) {
        starts.push({ val: "a".charCodeAt(0), x: ci, y: ri, visited: [] });
      }

      return val;
    }),
  __dirname,
  process.env.INPUT
);

const getNeighbor = (x: number, y: number, visited): Node =>
  map[y]?.[x] && {
    val: map[y][x],
    x,
    y,
    visited: [].concat(visited),
  };

let shortestPathLength = Infinity;

const mins = map.map((row) => row.map(() => Infinity));

for (let start of starts) {
  const toVisit = [start];

  while (toVisit.length) {
    const [c] = toVisit.splice(0, 1);

    if (c.x === end.x && c.y === end.y) {
      shortestPathLength = Math.min(c.visited.length);
      continue;
    }

    c.visited.push(`${c.x},${c.y}`);

    if (
      c.visited.length >= shortestPathLength ||
      c.visited.length >= mins[c.y][c.x]
    ) {
      continue;
    }

    mins[c.y][c.x] = c.visited.length;

    const toAdd = [
      getNeighbor(c.x, c.y + 1, c.visited),
      getNeighbor(c.x, c.y - 1, c.visited),
      getNeighbor(c.x - 1, c.y, c.visited),
      getNeighbor(c.x + 1, c.y, c.visited),
    ].filter(
      (n) => n && n.val - c.val <= 1 && !c.visited.includes(`${n.x},${n.y}`)
    );

    toVisit.splice(0, 0, ...toAdd);
  }
}

console.log(shortestPathLength);
