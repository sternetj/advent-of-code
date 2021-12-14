import { parseInput } from "../../util/parse-input";
import { uniqBy } from "lodash";

type Point = {
  x: number;
  y: number;
};

const input = parseInput(
  (l) => {
    if (l.startsWith("fold along")) {
      const [_, dir, num] = l.match(/.*([xy])=(\d+)/);
      return { [dir]: Number(num) } as Partial<Point>;
    } else {
      const [x, y] = l.split(",").map(Number);
      return { x, y };
    }
  },
  __dirname,
  "input.txt"
);

let points = input.filter((p) => "x" in p && "y" in p) as Point[];
const folds = input.filter((p) => !("x" in p && "y" in p));

folds.slice(0, 1).forEach((fold) => {
  const dir = "x" in fold ? "x" : "y";
  const foldDim = fold[dir];

  points = uniqBy(
    points.map((p) => ({
      ...p,
      [dir]: p[dir] >= foldDim ? foldDim - (p[dir] - foldDim) : p[dir],
    })),
    (p) => `${p.x},${p.y}`
  );
});

console.log(points.length);
