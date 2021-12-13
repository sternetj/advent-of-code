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

const printPoints = (p: Point[]) => {
  const maxX = Math.max(...p.map((p) => p.x));
  const maxY = Math.max(...p.map((p) => p.y));
  let output = "";

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const hasPoint = p.some((p) => p.x == x && p.y == y);

      output += hasPoint ? "#" : ".";
    }
    output += "\n";
  }

  console.log(output);
};

folds.slice(0, 1).forEach((fold) => {
  const dir = "x" in fold ? "x" : "y";
  const foldDim = fold[dir];

  // printPoints(points);
  points = uniqBy(
    points.map((p) => ({
      ...p,
      [dir]: p[dir] >= foldDim ? foldDim - (p[dir] - foldDim) : p[dir],
    })),
    (p) => `${p.x},${p.y}`
  );
});

// printPoints(points);
console.log(points.length);
