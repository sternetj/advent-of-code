import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, "input.txt");

const determineTreesForSlope = (x, y) => {
  let row = 0;
  let col = 0;
  let treeCount = 0;

  while (row < input.length) {
    if (input[row][col % input[0].length] === "#") {
      treeCount++;
    }

    row += y;
    col += x;
  }

  return treeCount;
};

const result = [
  determineTreesForSlope(1, 1),
  determineTreesForSlope(3, 1),
  determineTreesForSlope(5, 1),
  determineTreesForSlope(7, 1),
  determineTreesForSlope(1, 2),
].reduce((t, v) => t * v, 1);

console.log(result);
