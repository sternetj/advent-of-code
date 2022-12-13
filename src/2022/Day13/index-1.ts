import { chunk } from "lodash";
import { parseInput } from "../../util/parse-input";

type Signals = number | Array<Signals>;

const signals: Signals = parseInput(
  (line) => JSON.parse(line),
  __dirname,
  process.env.INPUT
);

const packets = chunk(signals, 2) as [Signals, Signals][];

const isInRightOrder = ([left, right]: [Signals, Signals]) => {
  if (typeof left === "number" && typeof right === "number") {
    return left !== right ? left < right : undefined;
  } else if (typeof left === "number") {
    return isInRightOrder([[left], right]);
  } else if (typeof right === "number") {
    return isInRightOrder([left, [right]]);
  }

  let i = 0;
  for (i = 0; i < left.length; i++) {
    if (typeof right[i] === "undefined") return false;
    const comp = isInRightOrder([left[i], right[i]]);
    if (typeof comp === "boolean") return comp;
  }

  return isInRightOrder([left.length, right.length]);
};

console.log(
  packets.reduce(
    (total, packet, i) => total + (isInRightOrder(packet) ? i + 1 : 0),
    0
  )
);
