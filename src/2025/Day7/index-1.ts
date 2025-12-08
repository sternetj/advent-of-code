import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.replace("S", "|").split(""));

let splitCount = 0;
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    const cell = input[row][col];
    if (cell !== "|") continue;
    const cellBelow = input[row + 1]?.[col];
    if (!cellBelow) continue;
    if (cellBelow === ".") {
      input[row + 1][col] = "|";
    } else if (cellBelow === "^") {
      splitCount++;
      for (const dx of [-1, 1]) {
        const adjacent = input[row + 1][col + dx];
        if (adjacent === ".") {
          input[row + 1][col + dx] = "|";
        }
      }
    }
  }
}

console.log(splitCount);
