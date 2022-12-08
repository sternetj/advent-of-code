import { parseInput } from "../../util/parse-input";

let id = 0;
const forrest = parseInput(
  (v) => v.split("").map((v) => ({ id: id++, tree: +v })),
  __dirname,
  process.env.INPUT
);

const getVisibleInRows = (grid, found = {}) => {
  grid.forEach((row) => {
    let lastTallTree = -1;
    row.forEach(({ id, tree }) => {
      if (tree > lastTallTree) {
        found[id] = true;
        lastTallTree = tree;
      }
    });
  });

  return found;
};

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
}

const getVisibleTrees = (grid) => {
  let visibleTrees = {};
  for (let i = 0; i < 4; i++) {
    visibleTrees = getVisibleInRows(grid, visibleTrees);
    grid = rotate(grid);
  }

  return Object.keys(visibleTrees).length;
};

console.log(getVisibleTrees(forrest));
