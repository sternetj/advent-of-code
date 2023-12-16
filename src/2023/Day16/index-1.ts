import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

type Dir = "r" | "d" | "u" | "l";
type Point = { x: number; y: number };

const movePointInDirection = (point: Point, dir: Dir): Point => {
  switch (dir) {
    case "r":
      return { ...point, x: point.x + 1 };
    case "d":
      return { ...point, y: point.y + 1 };
    case "l":
      return { ...point, x: point.x - 1 };
    case "u":
      return { ...point, y: point.y - 1 };
  }
};

const beams: [{ pos: Point; dir: Dir }] = [{ pos: { x: -1, y: 0 }, dir: "r" }];
const energized: Record<string, boolean> = {};
const visited: Record<string, boolean> = {};

while (beams.length) {
  const { pos, dir } = beams.pop();
  const p = movePointInDirection(pos, dir);

  const cell = input[p.y]?.[p.x];
  const id = `${p.x},${p.y}`;
  const idWithDir = `${id}|${dir}`;

  if (cell && !visited[idWithDir]) {
    energized[id] = true;
    visited[idWithDir] = true;

    if (cell === "\\") {
      beams.push({
        pos: p,
        dir: {
          d: "r",
          l: "u",
          r: "d",
          u: "l",
        }[dir] as Dir,
      });
    } else if (cell === "/") {
      beams.push({
        pos: p,
        dir: {
          d: "l",
          l: "d",
          r: "u",
          u: "r",
        }[dir] as Dir,
      });
    } else if (cell === "-" && ["d", "u"].includes(dir)) {
      beams.push({ pos: p, dir: "l" });
      beams.push({ pos: p, dir: "r" });
    } else if (cell === "|" && ["l", "r"].includes(dir)) {
      beams.push({ pos: p, dir: "u" });
      beams.push({ pos: p, dir: "d" });
    } else {
      beams.push({ pos: p, dir });
    }
  }
}

console.log(Object.keys(energized).length);
