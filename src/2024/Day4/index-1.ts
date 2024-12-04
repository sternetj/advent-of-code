import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""));

const getWordsInAllDirections = (x: number, y: number, size = 4) => {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const words = [];
  for (const dir of dirs) {
    let currentSize = size;
    let word = "";
    let pos = [x, y];
    while (currentSize-- > 0) {
      word += input[pos[0]]?.[pos[1]] ?? "";
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }

    words.push(word);
  }

  return words;
};

let total = 0;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[x][y] === "X") {
      total += getWordsInAllDirections(x, y).filter((w) => w === "XMAS").length;
    }
  }
}

console.log(total);
