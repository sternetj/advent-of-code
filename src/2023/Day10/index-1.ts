import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

const [sRow, sCol] = input.reduce(
  (s, v, row) =>
    v.reduce((vc, cell, col) => (cell === "S" ? [row, col] : vc), s),
  undefined as number[]
);

const getAdjoiningCells = ([row, col]: number[]) => {
  const cell = input[row]?.[col];

  switch (cell) {
    case "|":
      return [
        [row - 1, col],
        [row + 1, col],
      ];
    case "-":
      return [
        [row, col - 1],
        [row, col + 1],
      ];
    case "L":
      return [
        [row - 1, col],
        [row, col + 1],
      ];
    case "J":
      return [
        [row - 1, col],
        [row, col - 1],
      ];
    case "7":
      return [
        [row + 1, col],
        [row, col - 1],
      ];
    case "F":
      return [
        [row + 1, col],
        [row, col + 1],
      ];
    default:
      return undefined;
  }
};

const dirs = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];
const positions = dirs
  .map((dir) => {
    const next = [dir[0] + sRow, dir[1] + sCol];
    return { next, cells: getAdjoiningCells(next) };
  })
  .filter(
    ({ cells }) => cells?.some((cell) => cell[0] === sRow && cell[1] === sCol)
  )
  .map(({ next }) => next);

const key = (cell: number[]) => cell.join(",");
const visited = { [key([sRow, sCol])]: true };
let step = 1;

while (positions.length) {
  const cell = positions.shift();
  if (cell && !visited[key(cell)]) {
    step++;
    visited[key(cell)] = true;
    positions.push(
      ...getAdjoiningCells(cell).filter(
        (c) => c[0] !== cell[0] || c[1] !== cell[1]
      )
    );
  }
}

console.dir(step / 2);
