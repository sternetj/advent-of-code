import { parseInput } from "../../util/parse-input";
import { find } from "lodash";

const input = parseInput((l) => l.split(""), __dirname, process.env.INPUT);

const getAdjacentGear = (r: number, c: number) => {
  for (let rx = r - 1; rx <= r + 1; rx++) {
    for (let cx = c - 1; cx <= c + 1; cx++) {
      if (input[rx]?.[cx] === "*") {
        return { r: rx, c: cx };
      }
    }
  }
};

type Location = { r: number; c: number };
const parts: { partNum: number; gearLocation: Location }[] = [];

let currentGearLocation: Location;
let currentNum = "";
for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[0].length; c++) {
    if (input[r][c].match(/[0-9]/)) {
      currentNum += input[r][c];
      const adjacentGear = getAdjacentGear(r, c);
      if (adjacentGear) {
        currentGearLocation = adjacentGear;
      }
    } else {
      if (currentGearLocation) {
        parts.push({ partNum: +currentNum, gearLocation: currentGearLocation });
      }

      currentGearLocation = undefined;
      currentNum = "";
    }
  }
}

console.log(
  parts.reduce((t, v, partIndex) => {
    const adjacentPart = parts
      .slice(partIndex + 1)
      .find(
        (p) =>
          p.gearLocation.r === v.gearLocation.r &&
          p.gearLocation.c === v.gearLocation.c
      );

    return t + v.partNum * (adjacentPart?.partNum ?? 0);
  }, 0)
);
