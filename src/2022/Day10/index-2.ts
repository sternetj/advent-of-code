import { chunk } from "lodash";
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
let remainingCycles = 1;
let msg = "";
ops.splice(0, 0, ["start"]);

while (ops.length) {
  remainingCycles--;

  if (remainingCycles === 0) {
    const [[_, value]] = ops.splice(0, 1);
    x += value ?? 0;

    if (ops[0]?.[0] === "noop") {
      remainingCycles = 1;
    } else {
      remainingCycles = 2;
    }
  }

  msg += Math.abs((msg.length % 40) - x) <= 1 ? "█" : " ";
}

msg = msg.slice(0, -1);

console.log(
  chunk(msg.split(""), 40)
    .map((r) => r.join(""))
    .join("\n")
);
