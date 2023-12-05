import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v, __dirname, process.env.INPUT);

const seeds = input[0].split(": ")[1].split(" ").map(Number);
const maps: { destStart: number; sourceStart: number; length: number }[][] = [];
let mapIndex = -1;

input.slice(1).forEach((l) => {
  if (l.includes(":")) {
    mapIndex++;
    maps[mapIndex] = [];
  } else {
    const [destStart, sourceStart, length] = l.split(" ").map(Number);
    maps[mapIndex].push({ destStart, sourceStart, length });
  }
});

const getMappedValue = (
  valueIn: number,
  map: { destStart: number; sourceStart: number; length: number }[]
) => {
  for (let range of map) {
    if (
      valueIn >= range.sourceStart &&
      valueIn <= range.sourceStart + range.length
    ) {
      const diff = valueIn - range.sourceStart;
      return range.destStart + diff;
    }
  }

  return valueIn;
};

for (let map of maps) {
  for (let index = 0; index < seeds.length; index++) {
    seeds[index] = getMappedValue(seeds[index], map);
  }
}

console.dir(Math.min(...seeds));
