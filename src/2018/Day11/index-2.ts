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

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let total = 0;
      for (let size = 0; size < gridSize - Math.max(x, y); size++) {
        for (let vx = x; vx <= x + size; vx++) {
          grid[vx][size + y] = grid[vx][size + y] || getPower(vx, size + y);
          total += grid[vx][size + y];
        }
        for (let vy = y; vy <= y + size - 1; vy++) {
          grid[size + x][vy] = grid[size + x][vy] || getPower(size + x, vy);
          total += grid[size + x][vy];
        }
        if (total > max) {
          max = total;
          bestCell = [x, y, size + 1];
        }
      }
    }
  }

  console.log(bestCell.join(","));
})();
