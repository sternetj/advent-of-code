import { parseSections } from "../../util/parse-input";

const [map, instructionsRaw] = parseSections(
  (l) => l.split(""),
  (l) => l.split(""),
);

const instructions = instructionsRaw.flat();

let y = map.findIndex((row) => row.includes("@"));
let x = map[y].indexOf("@");

map[y][x] = ".";

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

  let bx = nx,
    by = ny;
  if (map[ny]?.[nx] === "O") {
    while (map[by]?.[bx] && map[by]?.[bx] === "O") {
      bx += dx;
      by += dy;
    }

    if (map[by]?.[bx] !== ".") continue;

    map[by][bx] = "O";
    map[ny][nx] = ".";
  }

  x = nx;
  y = ny;
}

console.log(
  map.reduce(
    (total, row, y) =>
      total +
      row.reduce((rTotal, v, x) => {
        if (v === "O") {
          return rTotal + 100 * y + x;
        }

        return rTotal;
      }, 0),
    0,
  ),
);
