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
  } else if (vx === 0 && y < targetY[1] && vy < 0) {
    return undefined;
  }

  return maxHeightOfHit(x, y, vx, vy, max);
};

let hits = 0;

for (let x = 0; x <= maxX; x++) {
  for (let y = -maxY; y <= maxY; y++) {
    if (typeof maxHeightOfHit(0, 0, x, y) === "number") {
      hits++;
    }
  }
}

console.log(hits);

export {};
