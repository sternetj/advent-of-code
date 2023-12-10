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
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
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

const walkMap = (
  mapIn: number[][],
  onVisit: (cell: number[]) => void = () => {}
) => {
  const map = mapIn.slice().map((r) => r.slice());
  const visited = { [key([sRow, sCol])]: true };

  while (map.length) {
    const cell = map.shift();
    if (cell && !visited[key(cell)]) {
      visited[key(cell)] = true;
      onVisit(cell);
      map.push(
        ...getAdjoiningCells(cell).filter(
          (c) => c[0] !== cell[0] || c[1] !== cell[1]
        )
      );
    }
  }

  return { visited };
};

const { visited } = walkMap(positions);

const cleanMap = input.map((row, r) =>
  row.map((cell, c) => (visited[key([r, c])] ? cell : "."))
);

let markLoc: number[] = [positions[0][1] - sCol, positions[0][0] - sRow];
walkMap([positions[0]], ([row, col]) => {
  if (cleanMap[row + markLoc[0]]?.[col + markLoc[1]] === ".") {
    cleanMap[row + markLoc[0]][col + markLoc[1]] = "A";
  }
  if (cleanMap[row - markLoc[0]]?.[col - markLoc[1]] === ".") {
    cleanMap[row - markLoc[0]][col - markLoc[1]] = "B";
  }

  switch (cleanMap[row][col]) {
    case "L":
      markLoc = [-markLoc[1], -markLoc[0]];
      break;
    case "J":
      markLoc = [markLoc[1], markLoc[0]];
      break;
    case "7":
      markLoc = [-markLoc[1], -markLoc[0]];
      break;
    case "F":
      markLoc = [markLoc[1], markLoc[0]];
      break;
    default:
      break;
  }

  if (cleanMap[row + markLoc[0]]?.[col + markLoc[1]] === ".") {
    cleanMap[row + markLoc[0]][col + markLoc[1]] = "A";
  }
  if (cleanMap[row - markLoc[0]]?.[col - markLoc[1]] === ".") {
    cleanMap[row - markLoc[0]][col - markLoc[1]] = "B";
  }
});

let outside: string;
const finalMap = cleanMap.map((row) => {
  let current: string;
  const getNewCellVal = (cell: string) => {
    if (cell === "." && current) {
      return current;
    }

    if (cell === "A" || cell === "B") {
      outside ||= cell;
      current = cell;
    } else {
      current = undefined;
    }

    return cell;
  };

  let newRow = row.map(getNewCellVal);
  current = undefined;
  return newRow.reverse().map(getNewCellVal).reverse();
});

const inside = outside === "A" ? "B" : "A";

console.log(
  finalMap.reduce((t, row) => t + row.filter((v) => v === inside).length, 0)
);
