const targetX = [79, 137];
const targetY = [-176, -117];

const maxX = Math.abs(targetX[1]);
const maxY = Math.abs(targetY[0]);

const maxHeightOfHit = (
  x: number,
  y: number,
  vx: number,
  vy: number,
  max = 0
) => {
  const dvx = vx === 0 ? 0 : vx > 0 ? -1 : 1;
  x += vx;
  y += vy;
  vx += dvx;
  vy += -1;
  max = Math.max(max, y);

  if (
    x >= targetX[0] &&
    x <= targetX[1] &&
    y >= targetY[0] &&
    y <= targetY[1]
  ) {
    return max;
  } else if (vx === 0 && y < targetY[1]) {
    return 0;
  }

  return maxHeightOfHit(x, y, vx, vy, max);
};

let maxHeight = 0;

for (let x = -maxX; x < maxX; x++) {
  for (let y = -maxY; y < maxY; y++) {
    maxHeight = Math.max(maxHeight, maxHeightOfHit(0, 0, x, y));
  }
}

console.log(maxHeight);

export {};
