import { parseInput } from "../../util/parse-input";

let id = 0;
const forrest = parseInput(
  (v) => v.split("").map((v) => ({ id: id++, tree: +v })),
  __dirname,
  process.env.INPUT
);

const calcScoreForRows = (grid, index, scores = {}) => {
  grid.forEach((row) => {
    let treesInRow = [];
    row.forEach(({ id, tree }) => {
      scores[id] = scores[id] || [];
      const furthestTreeIndex = treesInRow.findIndex((t) => t >= tree);
      scores[id][index] =
        furthestTreeIndex === -1 ? treesInRow.length : furthestTreeIndex + 1;
      treesInRow.splice(0, 0, tree);
    });
  });

  return scores;
};

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
}

const getHighestVisibilityScore = (grid) => {
  let scores: Record<number, number[]> = {};
  for (let i = 0; i < 4; i++) {
    scores = calcScoreForRows(grid, i, scores);
    grid = rotate(grid);
  }

  return Object.values(scores).reduce((max, score) => {
    return Math.max(
      max,
      score.reduce((t, v) => t * v, 1)
    );
  }, 0);
};

console.log(getHighestVisibilityScore(forrest));
