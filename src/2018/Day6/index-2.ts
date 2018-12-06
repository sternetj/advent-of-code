import { parseInput } from "../../util/parse-input";

const maxDistance = 10000;

let input = parseInput(v => v.split(", ").map(Number), __dirname, "input.txt");

const maxX = Math.max(...input.map(([x]) => x)) + 1;
const maxY = Math.max(...input.map(([x, y]) => y)) + 1;

const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
const iterMap = (func: (mapX, mapY) => void) => {
  for (let mapX = 0; mapX < maxX; mapX++) {
    for (let mapY = 0; mapY < maxY; mapY++) {
      func(mapX, mapY);
    }
  }
};

let maxArea = 0;
iterMap((mapX, mapY) => {
  let distance = 0;
  for (let [x, y] of input) {
    distance += getDistance(x, y, mapX, mapY);
  }

  if (distance < maxDistance) {
    maxArea++;
  }
});

console.log(maxArea);
