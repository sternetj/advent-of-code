import { parseInput } from "../../util/parse-input";

const [[est], busses] = parseInput(
  (v) => v.split(",").map(Number).filter(isFinite),
  __dirname,
  "input.txt",
);

const earliestTime = Math.min(...busses.map((v) => Math.ceil(est / v) * v));

const bussId = busses.find((v) => earliestTime % v === 0);

console.log((earliestTime - est) * bussId);
