import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v.split(""), __dirname, "input.txt");

const computeSeatId = (
  pass: string[],
  rMin = 0,
  rMax = 127,
  cMin = 0,
  cMax = 7,
): number => {
  if (!pass.length) return rMax * 8 + cMax;

  const c = pass.shift();

  switch (c) {
    case "F":
      rMax = rMin + Math.floor((rMax - rMin) / 2);
      break;
    case "B":
      rMin += Math.floor((rMax - rMin) / 2) + 1;
      break;
    case "L":
      cMax = cMin + Math.floor((cMax - cMin) / 2);
      break;
    case "R":
      cMin += Math.floor((cMax - cMin) / 2) + 1;
      break;
  }

  return computeSeatId(pass, rMin, rMax, cMin, cMax);
};

const seatIds = input.map((pass) => computeSeatId(pass)).sort((a, b) => a - b);
console.log(seatIds.filter((i) => seatIds.indexOf(i - 1) === -1).pop() - 1);
