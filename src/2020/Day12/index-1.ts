import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => ({ d: v[0], amt: +v.slice(1) }),
  __dirname,
  "input.txt",
);

let x = 0;
let y = 0;
let dir = "E";

const dirAfterTurn = (dir: string, deg: number) => {
  if (deg < 0) deg += Math.ceil(Math.abs(deg) / 360) * 360;
  if (deg === 0) return dir;

  return dirAfterTurn({ N: "E", S: "W", E: "S", W: "N" }[dir], deg - 90);
};

input.forEach(({ d, amt }) => {
  if (d === "L") {
    dir = dirAfterTurn(dir, -1 * amt);
  } else if (d === "R") {
    dir = dirAfterTurn(dir, amt);
  } else if (d === "F") {
    d = dir;
  }

  if (d === "N") {
    y += amt;
  } else if (d === "S") {
    y -= amt;
  } else if (d === "E") {
    x += amt;
  } else if (d === "W") {
    x -= amt;
  }

  console.log(
    `${x >= 0 ? "east" : "west"} ${Math.abs(x)}, ${
      y >= 0 ? "north" : "south"
    } ${Math.abs(y)}`,
  );
});

console.log(Math.abs(x) + Math.abs(y));
