import { parseSections } from "../../util/parse-input";

const [wiresIn, gates] = parseSections(
  (l) => [l.split(": ")[0], Number(l.split(": ")[1])] as const,
  (l) => l.match(/(.+) (AND|OR|XOR) (.+) -> (.+)/).slice(1),
);

const wires = Object.fromEntries(wiresIn);
const toProcess = [...gates];

while (toProcess.length) {
  const [a, op, b, out] = toProcess.shift()!;
  if (!(a in wires && b in wires)) {
    toProcess.push([a, op, b, out]);
    continue;
  }

  const aVal = wires[a];
  const bVal = wires[b];

  if (op === "AND") {
    wires[out] = aVal & bVal;
  } else if (op === "OR") {
    wires[out] = aVal | bVal;
  } else if (op === "XOR") {
    wires[out] = aVal ^ bVal;
  }
}

const outputKeys = Object.keys(wires).filter((k) => k.startsWith("z"));
outputKeys.sort((a, b) => b.localeCompare(a));

const output = parseInt(outputKeys.map((k) => wires[k]).join(""), 2);

console.log(output);
