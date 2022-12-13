import { chunk } from "lodash";
import { parseInput } from "../../util/parse-input";

type Signals = number | Array<Signals>;

const packets: Signals = parseInput(
  (line) => JSON.parse(line),
  __dirname,
  process.env.INPUT
);

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

const decoder1 = [[2]];
const decoder2 = [[6]];
packets.push(decoder1, decoder2);

packets.sort((a, b) => (isInRightOrder([a, b]) ? -1 : 1));

console.log((packets.indexOf(decoder1) + 1) * (packets.indexOf(decoder2) + 1));
