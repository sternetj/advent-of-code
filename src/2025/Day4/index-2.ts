import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""));

const getRemovableCells = () =>
  input.reduce(
    (toRemove, line, row) => {
      for (let col = 0; col < line.length; col++) {
        if (line[col] !== "@") continue;
        let count = 0;
        for (let cx = -1; cx <= 1; cx++) {
          for (let rx = -1; rx <= 1; rx++) {
            const check = (input[row + rx] || [])[col + cx];
            if (check === "@") count++;
          }
        }

        if (count <= 4) {
          toRemove.push([row, col]);
        }
      }
      return toRemove;
    },
    [] as [number, number][],
  );

let totalRemoved = 0;
let toRemove = [];
do {
  toRemove = getRemovableCells();
  toRemove.forEach(([r, c]) => (input[r][c] = "."));
  totalRemoved += toRemove.length;
} while (toRemove.length);

console.log(totalRemoved);
