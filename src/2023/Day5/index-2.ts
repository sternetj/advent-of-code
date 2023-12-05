import { parseInput } from "../../util/parse-input";

const input = parseInput((v) => v, __dirname, process.env.INPUT);

type Range = {
  destStart: number;
  sourceStart: number;
  length: number;
  rangeId: number;
};

const seeds = input[0].split(": ")[1].split(" ").map(Number);
const maps: Range[][] = [];
let mapIndex = -1;
let rangeId = 1;

input.slice(1).forEach((l) => {
  if (l.includes(":")) {
    mapIndex++;
    maps[mapIndex] = [];
  } else {
    const [destStart, sourceStart, length] = l.split(" ").map(Number);
    maps[mapIndex].push({ destStart, sourceStart, length, rangeId: rangeId++ });
  }
});

const getSourceValue = (valueIn: number, map: Range[]) => {
  for (let range of map) {
    if (
      valueIn >= range.destStart &&
      valueIn <= range.destStart + range.length
    ) {
      const diff = valueIn - range.destStart;
      return range.sourceStart + diff;
    }
  }

  return valueIn;
};

let location = 0;
maps.reverse();

while (true) {
  let result = location++;
  for (let map of maps) {
    result = getSourceValue(result, map);
  }

  const isMinLocation = seeds.some((v, i) => {
    return i % 2 === 0 && result >= v && result < v + seeds[i + 1];
  });

  if (isMinLocation) {
    location--;
    break;
  }
}

console.log(location);
