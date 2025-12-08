import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.replace("S", "|").split(""));

const cloneMap = (map: string[][]) => map.map((l) => l.slice());

const cache: Record<string, number> = {};
const calcPaths = (map: string[][], [row, col]: number[]) => {
  const key = `${row}-${col}`;
  const cached = cache[key];
  if (isFinite(cached)) return cached;

  const finalize = (value: number) => {
    cache[key] = value;
    return value;
  };

  let total = 1;
  const cell = map[row][col];
  const cellBelow = map[row + 1]?.[col];
  if (cell !== "|" || !cellBelow) return finalize(0);

  if (cellBelow === ".") {
    map[row + 1][col] = "|";
    return calcPaths(map, [row + 1, col]);
  } else if (cellBelow === "^") {
    for (const dx of [-1, 1]) {
      const adjacent = map[row + 1][col + dx];
      if (adjacent === ".") {
        const nextMap = cloneMap(map);
        nextMap[row + 1][col + dx] = "|";
        total += calcPaths(nextMap, [row + 1, col + dx]);
      }
    }
  }

  return finalize(total);
};

const start = [0, input[0].findIndex((v) => v === "|")];
const total = calcPaths(cloneMap(input), start) + 1; // +1 for initial timeline? Just a guess

console.log(total);
