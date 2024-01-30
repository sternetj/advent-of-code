import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

let steps = process.env.INPUT.includes("test") ? 6 : 64;

const start = input.reduce<[number, number] | undefined>(
  (coords, row, rowIndex) => {
    if (coords) return coords;

    const colIndex = row.indexOf("S");

    if (colIndex > -1) return [rowIndex, colIndex];
  },
  undefined
);

let positions = [start];

while (steps-- > 0) {
  let newPositions = [];
  for (const position of positions) {
    for (const dir of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const cR = position[0] + dir[0];
      const cC = position[1] + dir[1];
      const cell = input[cR]?.[cC];
      if (cell && cell !== "#") {
        newPositions.push([cR, cC]);
      }
    }
  }

  positions = newPositions.filter(
    (pos, i) =>
      newPositions.findIndex(
        (pPrime) => pPrime[0] === pos[0] && pPrime[1] === pos[1]
      ) === i
  );
}

console.log(positions.length);
