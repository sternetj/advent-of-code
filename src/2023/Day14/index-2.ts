import { parseInput } from "../../util/parse-input";
import orderBy from "lodash/orderBy";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

const calculateLoad = (map: string[][]) => {
  const maxes: Record<number, number> = {};

  return map.reduce((total, row, ri) => {
    return (
      total +
      row.reduce((tCol, cell, ci) => {
        maxes[ci] = maxes[ci] ?? 0;

        if (cell === "#" || cell === "O") {
          const newMax = cell === "#" ? ri + 1 : maxes[ci] + 1;
          const value = cell === "#" ? 0 : input.length - maxes[ci];
          maxes[ci] = newMax;
          return tCol + value;
        }

        return tCol;
      }, 0)
    );
  }, 0);
};

let rocks = input.flatMap((row, ri) =>
  row
    .map((cell, ci) => cell !== "." && ([cell, ri, ci] as const))
    .filter((v) => v)
);

// let cycles = 1000000000;
let cycles = 1;
let width = input[0].length;
let height = input.length;

while (cycles-- > 0) {
  let rotations = 4;
  while (rotations-- > 0) {
    const maxes: Record<number, number> = {};

    console.log(
      new Array(height)
        .fill(1)
        .map((_, r) =>
          new Array(width)
            .fill(1)
            .map((_, c) => {
              const rock = rocks.find((rock) => rock[1] === r && rock[2] === c);
              return rock?.[0] || ".";
            })
            .join("")
        )
        .join("\n") + " \n"
    );

    rocks = rocks.map(([cell, ri, ci]) => {
      maxes[ci] = maxes[ci] ?? 0;
      const newMax = cell === "#" ? ri + 1 : maxes[ci] + 1;
      const newRock = cell === "#" ? [ri, ci] : [maxes[ci], ci];
      maxes[ci] = newMax;

      return [cell, newRock[0], newRock[1]];
    });

    console.log(
      new Array(height)
        .fill(1)
        .map((_, r) =>
          new Array(width)
            .fill(1)
            .map((_, c) => {
              const rock = rocks.find((rock) => rock[1] === r && rock[2] === c);
              return rock?.[0] || ".";
            })
            .join("")
        )
        .join("\n") + " \n"
    );
    console.log("==============");

    rocks = orderBy(
      rocks.map(([cell, ri, ci]) => [cell, height - ci - 1, ri]),
      [1, 2],
      "asc"
    );

    const tempWidth = width;
    width = height;
    height = tempWidth;
  }
}

console.log(
  new Array(height)
    .fill(1)
    .map((_, r) =>
      new Array(width)
        .fill(1)
        .map((_, c) => {
          const rock = rocks.find((rock) => rock[1] === r && rock[2] === c);
          return rock?.[0] || ".";
        })
        .join("")
    )
    .join("\n")
);

// width: 10
// height: 10

// 7,3 -> 8,7
// 8,8 -> 3,8
// 4,10 -> 1,4
// 1,1 -> 10,1
