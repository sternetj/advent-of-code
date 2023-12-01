import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => {
    const first = l.split("").find((v) => isFinite(parseInt(v)));
    const last = l
      .split("")
      .reverse()
      .find((v) => isFinite(parseInt(v)));
    return Number(first + last);
  },
  __dirname,
  process.env.INPUT
);

console.log(input.reduce((t, v) => t + v, 0));
