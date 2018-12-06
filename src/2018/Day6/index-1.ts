import { parseInput } from "../../util/parse-input";

class Cell {
  public isOverlapped = false;
  constructor(public id: number, public distance: number) {}
}

let input = parseInput(v => v.split(", ").map(Number), __dirname, "input.txt");

const maxX = Math.max(...input.map(([x]) => x)) + 1;
const maxY = Math.max(...input.map(([x, y]) => y)) + 1;

let map: Cell[][] = new Array(maxX)
  .fill(1)
  .map(() => new Array(maxY).fill(undefined));

const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
const iterMap = (func: (mapX, mapY) => void) => {
  for (let mapX = 0; mapX < map.length; mapX++) {
    for (let mapY = 0; mapY < map[0].length; mapY++) {
      func(mapX, mapY);
    }
  }
};

for (let id = 0; id < input.length; id++) {
  let [x, y] = input[id];

  iterMap((mapX, mapY) => {
    let distance = getDistance(x, y, mapX, mapY);
    let mapCell = map[mapX][mapY];
    if (!mapCell || mapCell.distance > distance) {
      map[mapX][mapY] = new Cell(id, distance);
    } else if (mapCell.distance === distance) {
      map[mapX][mapY].isOverlapped = true;
    }
  });
}

iterMap((mapX, mapY) => {
  let mapCell = map[mapX][mapY];
  if (mapCell && mapCell.isOverlapped) {
    map[mapX][mapY] = undefined;
  }
});

let idsToRemove = new Set();
for (let edgeX of [0, map.length - 1]) {
  for (let mapY = 0; mapY < map[0].length; mapY++) {
    let mapCell = map[edgeX][mapY];
    if (mapCell) {
      idsToRemove.add(mapCell.id);
    }
  }
}

for (let mapX = 0; mapX < map.length; mapX++) {
  for (let edgeY of [0, map[0].length - 1]) {
    let mapCell = map[mapX][edgeY];
    if (mapCell) {
      idsToRemove.add(mapCell.id);
    }
  }
}

let counts: { [id: number]: number } = {};
iterMap((x, y) => {
  let cell = map[x][y];

  if (cell && !idsToRemove.has(cell.id)) {
    counts[cell.id] = counts[cell.id] || 0;
    counts[cell.id]++;
  }
});

let maxArea = Math.max(...Object.values(counts));

console.log(maxArea);
