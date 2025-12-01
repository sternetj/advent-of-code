import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("-"));

const connections: Record<string, Record<string, boolean>> = {};

input.forEach(([a, b]) => {
  connections[a] ??= {};
  connections[b] ??= {};

  connections[a][b] = true;
  connections[b][a] = true;
});

const makeKey = (...parts: string[]) => {
  parts.sort((a, b) => a.localeCompare(b));
  return parts.join(",");
};

for (const [k1, layer1] of Object.entries(connections)) {
}

console.log(connections);
