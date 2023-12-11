import { parseInput } from "../../util/parse-input";

const emptyColumns = {};
const input = parseInput(
  (l) => {
    const isEmpty = l.indexOf("#") === -1;
    const cells = l.split("");
    cells.forEach((cell, col) => {
      emptyColumns[col] = emptyColumns[col] ?? true;
      if (cell === "#") {
        emptyColumns[col] = false;
      }
    });
    return { isEmpty, cells };
  },
  __dirname,
  process.env.INPUT
);

const expandBy = 1_000_000 - 1; // Empty rows/columns are replaced by x number of rows/columns so subtract 1 to not add the original row/column again.
let rShift = 0;
const galaxies = input.reduce((found, row, r) => {
  let cShift = 0;
  if (row.isEmpty) {
    rShift += expandBy;
    return found;
  }

  return found.concat(
    ...row.cells.map((col, c) => {
      if (col !== "#") {
        if (emptyColumns[c]) {
          cShift += expandBy;
        }
        return [];
      }

      return [[r + rShift, c + cShift]];
    })
  );
}, []);

const totalDistances = galaxies.reduce(
  (t1, [r1, c1], index) =>
    t1 +
    galaxies
      .slice(index + 1)
      .reduce(
        (t2, [r2, c2]) => t2 + (Math.abs(r2 - r1) + Math.abs(c2 - c1)),
        0
      ),
  0
);

console.log(totalDistances);
