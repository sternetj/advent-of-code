import { parseInput } from "../../util/parse-input";

const ops = parseInput(
  (v) => {
    const [inst, value] = v.split(" ");
    return [inst, value && +value] as [string, number?];
  },
  __dirname,
  process.env.INPUT
);

let x = 1;
let cycle = 0;
let remainingCycles = 1;
const signalStrengths = [];
ops.splice(0, 0, ["start"]);

while (cycle++ < 220) {
  remainingCycles--;

  if (remainingCycles === 0) {
    const [[_, value]] = ops.splice(0, 1);
    x += value ?? 0;

    if (ops[0][0] === "noop") {
      remainingCycles = 1;
    } else {
      remainingCycles = 2;
    }
  }

  if ((cycle + 20) % 40 === 0) {
    signalStrengths.push(cycle * x);
  }
}

const signalSum = signalStrengths.reduce((t, v) => t + v, 0);

console.log(signalSum);
