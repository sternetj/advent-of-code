import { parseString } from "../../util/parse-input";
import { chunk, parseInt, sum, multiply } from "lodash";

const input = parseString(__dirname, "input.txt");

const hex2bin = (data) =>
  data
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");

const readPackets = (bin: string) => {
  const version = parseInt(bin.slice(0, 3), 2);
  const type = parseInt(bin.slice(3, 6), 2);
  let value: number;
  let length: number;
  let numPackets: number;
  let remaining: string;
  let mode: string;
  const subPackets = [];

  if (type === 4) {
    const chunks = chunk(bin.slice(6), 5);
    const index = chunks.findIndex((c) => c[0] === "0") + 1;
    value = parseInt(
      chunks
        .slice(0, index)
        .map((b) => b.slice(1).join(""))
        .join(""),
      2
    );
    remaining = chunks
      .slice(index)
      .map((c) => c.join(""))
      .join("");
  } else {
    mode = bin[6];

    if (mode === "0") {
      length = parseInt(bin.slice(7, 22), 2);
      remaining = bin.slice(22, 22 + length);
      while (remaining.length >= 5) {
        const pack = readPackets(remaining);
        remaining = pack.remaining;
        subPackets.push(pack);
      }
      remaining = bin.slice(22 + length);
    } else {
      numPackets = parseInt(bin.slice(7, 18), 2);
      remaining = bin.slice(18);
      while (subPackets.length < numPackets) {
        const pack = readPackets(remaining);
        remaining = pack.remaining;
        subPackets.push(pack);
      }
    }
  }

  return {
    version,
    type,
    value,
    mode,
    length,
    numPackets,
    remaining,
    subPackets,
  };
};

const calcValue = (packet) => {
  switch (packet.type) {
    case 0:
      return sum(packet.subPackets.map(calcValue));
    case 1:
      return packet.subPackets.map(calcValue).reduce(multiply, 1);
    case 2:
      return Math.min(...packet.subPackets.map(calcValue));
    case 3:
      return Math.max(...packet.subPackets.map(calcValue));
    case 4:
      return packet.value;
    case 5:
      return calcValue(packet.subPackets[0]) > calcValue(packet.subPackets[1])
        ? 1
        : 0;
    case 6:
      return calcValue(packet.subPackets[0]) < calcValue(packet.subPackets[1])
        ? 1
        : 0;
    case 7:
      return calcValue(packet.subPackets[0]) === calcValue(packet.subPackets[1])
        ? 1
        : 0;
    default:
      throw Error("Unexpected type");
  }
};

const parsed = readPackets(hex2bin(input));
console.log(calcValue(parsed));
