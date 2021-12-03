import { xor } from "lodash";
import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => ({ d: v[0], amt: +v.slice(1) }),
  __dirname,
  "input.txt",
);

let wx = 10,
  wy = 1,
  sx = 0,
  sy = 0;

type Point = { x: number; y: number };
const dirAfterTurn = ({ x, y }: Point, deg: number): Point => {
  if (deg < 0) deg += Math.ceil(Math.abs(deg) / 360) * 360;
  if (deg === 0) return { x, y };

  let newY,
    newX = y;

  if (x >= 0) newY = -x;
  if (x < 0) newY = -1 * x;

  return dirAfterTurn({ x: newX, y: newY }, deg - 90);
};

input.forEach(({ d, amt }) => {
  if (d === "L") {
    let res = dirAfterTurn({ x: wx, y: wy }, -1 * amt);
    wx = res.x;
    wy = res.y;
  } else if (d === "R") {
    let res = dirAfterTurn({ x: wx, y: wy }, amt);
    wx = res.x;
    wy = res.y;
  } else if (d === "F") {
    sx += amt * wx;
    sy += amt * wy;
  }

  if (d === "N") {
    wy += amt;
  } else if (d === "S") {
    wy -= amt;
  } else if (d === "E") {
    wx += amt;
  } else if (d === "W") {
    wx -= amt;
  }

  console.log(
    `${d}${amt} - waypoint: ${wx >= 0 ? "east" : "west"} ${Math.abs(wx)}, ${
      wy >= 0 ? "north" : "south"
    } ${Math.abs(wy)} & ship: ${sx >= 0 ? "east" : "west"} ${Math.abs(sx)}, ${
      sy >= 0 ? "north" : "south"
    } ${Math.abs(sy)}`,
  );
});

console.log(Math.abs(sx) + Math.abs(sy));
