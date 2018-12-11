(function() {
  const gridSerialNumber = 5093;
  const gridSize = 300;

  const grid = new Array(gridSize).fill(1).map(() => new Array(gridSize));
  let max = -Infinity;
  let bestCell = [];

  const getPower = (x, y) => {
    let rackId = x + 10;
    let powerLevel = rackId * y;
    powerLevel += gridSerialNumber;
    powerLevel *= rackId;
    powerLevel = Math.floor((powerLevel / 100) % 10);
    return powerLevel - 5;
  };

  for (let x = 1; x < gridSize - 1; x++) {
    for (let y = 1; y < gridSize - 1; y++) {
      let total = 0;
      for (let vx = x - 1; vx <= x + 1; vx++) {
        for (let vy = y - 1; vy <= y + 1; vy++) {
          grid[vx][vy] = grid[vx][vy] || getPower(vx, vy);
          total += grid[vx][vy];
        }
      }

      if (total > max) {
        max = total;
        bestCell = [x - 1, y - 1];
      }
    }
  }

  console.log(bestCell.join(","));
})();
