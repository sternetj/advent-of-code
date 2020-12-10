import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, "input.txt");

let row = 0;
let col = 0;
let treeCount = 0;

while (row < input.length) {
  if (input[row][col % input[0].length] === "#") {
    treeCount++;
  }

  row++;
  col += 3;
}

console.log(treeCount);
