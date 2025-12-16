import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(",").map(Number));

const key = (nums: number[]) => nums.join(",");
const distance = (a: number[], b: number[]) =>
  Math.sqrt(a.reduce((t, f, i) => t + Math.pow(f - b[i], 2), 0));
let circuits: Set<string>[] = [];
let distances: Record<string, number> = {};

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const a = input[i];
    const b = input[j];
    distances[[key(a), key(b)].join(";")] = distance(a, b);
  }
}

const pairs = Object.entries(distances)
  .map(([key, dist]) => ({
    points: key.split(";"),
    dist,
  }))
  .sort((a, b) => a.dist - b.dist);

let lastConnection: string[] = [];
while (pairs.length) {
  const { points } = pairs.shift();
  let circuitA = circuits.find((c) => c.has(points[0])) ?? [];
  let circuitB = circuits.find((c) => c.has(points[1])) ?? [];
  const nextCircuit = new Set([...circuitA, ...circuitB]);
  circuits = circuits.filter((c) => c !== circuitA && c !== circuitB);
  nextCircuit.add(points[0]);
  nextCircuit.add(points[1]);
  circuits.push(nextCircuit);
  if (nextCircuit.size === input.length) {
    lastConnection = points;
    break;
  }
}

const result = lastConnection.reduce((t, v) => t * Number(v.split(",")[0]), 1);

console.log(result);
