import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("-"));

const connections: Record<string, string[]> = {};

input.forEach(([a, b]) => {
  connections[a] ??= [];
  connections[b] ??= [];

  connections[a].push(b);
  connections[b].push(a);
});

const makeKey = (...parts: string[]) => {
  parts.sort((a, b) => a.localeCompare(b));
  return parts.join(",");
};

const output = Object.fromEntries(
  Object.entries(connections).flatMap(([k1, layer1]) => {
    const pairs: [string, boolean][] = [];
    for (const k2 of layer1) {
      const layer2 = connections[k2];

      for (const k3 of layer2) {
        if (connections[k3].includes(k1)) {
          pairs.push([makeKey(k1, k2, k3), true]);
        }
      }
    }

    return pairs;
  }),
);

console.log(
  Object.keys(output).filter((k) => k.startsWith("t") || k.includes(",t"))
    .length,
);
