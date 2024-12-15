import { parseSections } from "../../util/parse-input";

const [mapRaw, instructionsRaw] = parseSections(
  (l) => l.split(""),
  (l) => l.split(""),
);

const instructions = instructionsRaw.flat();

type El = [number, number, string];

const key = ([x, y]: El) => `${x},${y}`;

let map = mapRaw.map((r) =>
  r.flatMap((v) => {
    if (v === "#") return ["#", "#"];
    if (v === ".") return [".", "."];
    if (v === "O") return ["[", "]"];
    return ["@", "."];
  }),
);

let y = map.findIndex((row) => row.includes("@"));
let x = map[y].indexOf("@");

const newMap = map.map((r) => r.slice());
newMap[y][x] = "@";

map[y][x] = ".";

const getBoxesToMove = (
  m: string[][],
  x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  visited = {},
) => {
  const current = m[y]?.[x];
  if (visited[key([x, y, current])]) return [];
  visited[key([x, y, current])] = true;
  if (!["[", "]"].includes(current)) return [];

  let boxes: [El, El][] = [];
  if (current === "[") {
    boxes = [
      [
        [x, y, current],
        [x + 1, y, "]"],
      ],
      ...getBoxesToMove(m, x + dx, y + dy, dx, dy, visited),
      ...getBoxesToMove(m, x + 1, y, dx, dy, visited),
    ];
  } else if (current === "]") {
    boxes = [
      [
        [x - 1, y, "["],
        [x, y, current],
      ],
      ...getBoxesToMove(m, x + dx, y + dy, dx, dy, visited),
      ...getBoxesToMove(m, x - 1, y, dx, dy, visited),
    ];
  }

  return boxes.filter(([a, b], i, arr) =>
    arr
      .slice(i + 1)
      .every(
        ([na, nb]) =>
          [key(na), key(nb)].sort().join("|") !==
          [key(a), key(b)].sort().join("|"),
      ),
  );
};

for (let instruction of instructions) {
  let nx = x,
    ny = y;
  let dx = 0,
    dy = 0;
  if (instruction === ">") dx = 1;
  if (instruction === "<") dx = -1;
  if (instruction === "^") dy = -1;
  if (instruction === "v") dy = 1;

  nx += dx;
  ny += dy;

  if (map[ny]?.[nx] === "#") continue;

  if (["[", "]"].includes(map[ny]?.[nx])) {
    let newMap = map.map((r) => r.slice());
    const toMove = getBoxesToMove(newMap, nx, ny, dx, dy)
      .flat()
      .sort((a, b) => {
        if (instruction === ">") return b[0] - a[0];
        if (instruction === "<") return a[0] - b[0];
        if (instruction === "^") return a[1] - b[1];
        if (instruction === "v") return b[1] - a[1];
      });
    let moved = true;

    while (toMove.length) {
      const [mx, my, ms] = toMove.shift();
      newMap[my][mx] = ".";

      if (newMap[my + dy]?.[mx + dx] === ".") {
        newMap[my + dy][mx + dx] = ms;
        const newMap2 = newMap.map((r) => r.slice());
        newMap2[y][x] = "@";
      } else {
        moved = false;
        break;
      }
    }

    if (moved) {
      map = newMap.map((r) => r.slice());
    } else {
      continue;
    }
  }

  x = nx;
  y = ny;
  const newMap = map.map((r) => r.slice());
  newMap[y][x] = "@";
}

console.log(
  map.reduce(
    (total, row, y) =>
      total +
      row.reduce((rTotal, v, x) => {
        if (v === "[") {
          return rTotal + 100 * y + x;
        }

        return rTotal;
      }, 0),
    0,
  ),
);
